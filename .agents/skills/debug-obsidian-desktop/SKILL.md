---
name: debug-obsidian-desktop
description: 在 macOS 的真实 Obsidian Desktop 中复现、检查和验收主题视觉问题，并通过隔离 test vault、应用截图和 Electron DevTools 采集运行证据。用于用户明确要求桌面端 Obsidian 主题调试、视觉回归、computed style 检查或真应用截图时。
---

```python
from skill_contract import *

skill(
    name="debug-obsidian-desktop",
    purpose="在 macOS Obsidian Desktop 真应用中复现主题问题并采集可审计的视觉与样式证据。",
)

activate_when([
    "用户明确要求在 macOS Obsidian Desktop 真应用中调试或验收主题",
    "用户要求采集 Obsidian 桌面端截图、DOM、computed style、几何或控制台证据",
    "用户要求验证桌面端主题在聚焦、失焦、悬停、激活、深色或浅色状态下是否回归",
])

do_not_activate_when([
    "用户只要求静态审查 CSS 或修改源码，不要求真实 Obsidian 运行时证据",
    "用户要求 iPhone、iPad、Android 或浏览器中的移动端验收",
    "用户要求测试 Obsidian Publish 网页而不是桌面应用",
])

inputs(
    required=[
        input("task", type=NaturalLanguage, description="要复现、检查或验收的桌面端问题。"),
        input("vault_dir", type=Directory, description="专用于验收的隔离 Obsidian vault；优先从仓库规则识别 test-vault。"),
    ],
    optional=[
        input("artifact_dir", type=Directory, description="本地未跟踪截图与检查证据目录。", default="/tmp/debug-obsidian-desktop", required=False),
        input("acceptance_plan", type=Text, description="需要覆盖的主题、窗口和交互状态。", required=False),
    ],
    ask_when_missing=True,
)

outputs(
    required=[
        output("runtime_report", type=Text, description="Obsidian 版本、vault、窗口状态、复现步骤、结论和阻塞项。"),
        output("screenshot_paths", type=Text, description="带场景标签的桌面真应用截图路径。"),
        output("inspector_evidence", type=Text, description="相关 selector、body 状态类、computed style、几何、滚动或控制台证据。"),
    ],
)

environment(
    commands=["rg", "readlink", "realpath"],
    dependencies=["Obsidian Desktop", "Computer Use"],
    network="not_required",
    filesystem="anywhere_with_user_request",
)

workflow([
    step(
        "verify_vault",
        f"""
        读取仓库中的 AGENTS.md 或等价项目规则，确认 vault_dir 是隔离验收 vault。
        使用 {call_tool(
            "rg/readlink/realpath",
            how="检查验收 vault、主题目录以及 theme.css/manifest.json 链接或复制来源，确认运行时加载的是当前候选而非个人 vault 中的旧副本",
            expect="隔离 vault 与主题候选的来源可以被明确证明",
            on_failure="停止验收并要求用户提供或修复专用 test vault；不要改用个人 vault",
        )}。
        """,
        reads=["vault_dir"],
        writes=["vault_evidence"],
    ),
    step(
        "open_runtime",
        f"""
        使用 {call_skill(
            "computer-use:computer-use",
            how="启动或聚焦 macOS Obsidian，打开 vault_dir，记录应用版本、窗口尺寸、缩放、系统外观和当前工作区；不要进入个人 vault",
            mode="compose",
            expect="Obsidian 真应用显示指定验收 vault",
            on_failure="报告无法启动、无法切换 vault 或界面不可读的具体阻塞",
        )}。
        """,
        reads=["vault_dir"],
        writes=["runtime_state"],
    ),
    step(
        "reproduce_states",
        f"""
        按 task 与 acceptance_plan 重现目标状态。使用 {call_skill(
            "computer-use:computer-use",
            how="在 Obsidian 中操作目标笔记、侧栏、标签页、菜单或表格；需要失焦时切换到另一应用后再返回；每个关键状态保存一张完整窗口截图到 artifact_dir",
            mode="compose",
            expect="每个待判断状态都有可见的真应用截图",
            on_failure="记录无法自动到达的状态，并只在该状态确实需要人工手势时请求用户完成",
        )}。
        """,
        reads=["task", "acceptance_plan", "artifact_dir", "runtime_state"],
        writes=["screenshot_paths", "reproduction_log"],
    ),
    step(
        "inspect_runtime",
        f"""
        使用 {call_skill(
            "computer-use:computer-use",
            how="在 Obsidian 中用 Option+Command+I 打开 Electron DevTools；在 Elements/Console 中记录 body 状态类、目标 selector、getComputedStyle 关键颜色/背景/边框/圆角/透明度、getBoundingClientRect 几何、clientWidth 与 scrollWidth，以及与主题相关的控制台错误",
            mode="compose",
            expect="样式或布局结论同时具有 selector、状态和测量证据",
            on_failure="保留截图证据并明确说明 DevTools 未连接，避免把视觉推断写成 computed-style 事实",
        )}。
        """,
        reads=["task", "reproduction_log"],
        writes=["inspector_evidence"],
    ),
    step(
        "report",
        "汇总运行环境、复现路径、截图、Inspector 测量、通过项、问题和阻塞项；明确区分观察事实与推断。",
        reads=["vault_evidence", "runtime_state", "reproduction_log", "screenshot_paths", "inspector_evidence"],
        writes=["runtime_report"],
    ),
])

decision_rules([
    when("vault_dir 是个人 vault 或主题来源无法证明", then="停止并请求专用 test vault，不把个人数据带入验收证据"),
    when("问题涉及颜色、透明度、圆角、溢出或 selector 优先级", then="截图与 computed style 必须同时采集"),
    when("需要用临时 DOM/CSS 注入定位原因", then="只做可恢复的 Inspector 临时探针，标记为临时证据，并通过重新加载清除"),
    when("用户同时要求修复源码", then="先完成本 Skill 的运行时诊断；源码修改、提交和发布由后续明确授权的实现流程处理"),
])

quality_bar(
    must=[
        "只使用隔离验收 vault，并证明主题候选来源。",
        "报告 Obsidian 版本、vault、窗口与外观状态。",
        "每个视觉结论都引用对应截图；样式结论还引用 selector 和 computed style。",
        "失焦、悬停或激活问题必须真实触发对应状态后再判断。",
    ],
    should=[
        "使用稳定、可复现的场景命名截图。",
        "证据包含前景、背景、边框、圆角、透明度、几何和滚动指标中与问题相关的字段。",
    ],
    must_not=[
        "不要使用或修改个人 vault。",
        "不要把静态 CSS 推断当作 Obsidian 真应用证据。",
        "不要修改源码、git 状态、版本或发布状态。",
        "不要把桌面端结果宣称为移动端验收。",
    ],
)
```
