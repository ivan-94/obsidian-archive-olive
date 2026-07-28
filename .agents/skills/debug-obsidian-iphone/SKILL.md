---
name: debug-obsidian-iphone
description: 在真实 iPhone 上通过 iPhone 镜像操作 Obsidian，并用 Safari Web Inspector 复现、检查和验收主题视觉问题。用于用户明确要求 iPhone 真机调试、移动端截图、DOM/computed style 测量、视口或安全区检查时。
---

```python
from skill_contract import *

skill(
    name="debug-obsidian-iphone",
    purpose="结合 iPhone 镜像与 Safari Web Inspector 调试真实 iPhone 上的 Obsidian 主题。",
)

activate_when([
    "用户明确要求在真实 iPhone 上调试或验收 Obsidian 主题",
    "用户要求用 iPhone 镜像和 Safari Web Inspector 采集 Obsidian 移动端证据",
    "用户要求检查 iPhone 上的视口、滚动、安全区、软键盘、触控状态、computed style 或真机截图",
])

do_not_activate_when([
    "用户只要求 iOS Simulator 或桌面浏览器验证",
    "用户要求 iPad、Android 或 macOS Obsidian Desktop 验收",
    "用户只要求静态修改 CSS，不要求真实 iPhone 运行时证据",
])

inputs(
    required=[
        input("task", type=NaturalLanguage, description="要在真实 iPhone 上复现、检查或验收的问题。"),
    ],
    optional=[
        input("device_name", type=Text, description="Safari 与 iPhone 镜像中显示的设备名称。", required=False),
        input("target_vault", type=Text, description="设备上的专用验收 vault。", default="test-vault", required=False),
        input("artifact_dir", type=Directory, description="本地未跟踪真机截图与测量证据目录。", default="/tmp/debug-obsidian-iphone", required=False),
        input("acceptance_plan", type=Text, description="需要覆盖的深浅色、抽屉、菜单、搜索、编辑或方向状态。", required=False),
    ],
)

outputs(
    required=[
        output("device_report", type=Text, description="设备、iOS、Obsidian、vault、连接方式、复现步骤和阻塞项。"),
        output("screenshot_paths", type=Text, description="从 iPhone 镜像采集并按场景命名的截图路径。"),
        output("inspector_evidence", type=Text, description="Safari Inspector 页面、运行时状态类、selector、computed style、几何与视口测量。"),
        output("findings", type=Text, description="有截图与 Inspector 交叉证据的通过项和问题。"),
    ],
)

environment(
    dependencies=["macOS iPhone Mirroring", "Safari Web Inspector", "Computer Use"],
    network="not_required",
    filesystem="anywhere_with_user_request",
)

workflow([
    step(
        "connect_mirroring",
        f"""
        使用 {call_skill(
            "computer-use:computer-use",
            how="打开 iPhone 镜像，确认目标 iPhone 在 Mac 附近、已配对且处于镜像所需的锁定状态；记录设备名称和可见系统版本",
            mode="compose",
            expect="iPhone 镜像显示可交互的真实设备画面",
            on_failure="说明连接提示，并请求用户完成解锁确认、重新锁定、信任或靠近设备等必要人工操作",
        )}。
        """,
        writes=["mirror_state"],
        ask_user="iPhone 镜像要求人工确认、信任或重新锁定设备时，请完成后回复继续。",
    ),
    step(
        "open_target",
        f"""
        使用 {call_skill(
            "computer-use:computer-use",
            how="在 iPhone 镜像中打开 Obsidian，切换到 target_vault，确认候选主题已启用，记录可观察到的 Obsidian 版本，并按 task/acceptance_plan 到达目标状态",
            mode="compose",
            expect="真实 iPhone Obsidian 显示专用验收 vault 与目标场景",
            on_failure="报告缺少 vault、主题未同步或状态无法到达；不要改用个人 vault",
        )}。
        """,
        reads=["task", "target_vault", "acceptance_plan", "mirror_state"],
        writes=["runtime_state", "reproduction_log"],
    ),
    step(
        "attach_web_inspector",
        f"""
        使用 {call_skill(
            "computer-use:computer-use",
            how="在 macOS Safari 的开发菜单中选择 `<device_name> > Obsidian > localhost`，打开标题形如“网页检查器 — <device> — Obsidian — localhost”的 Web Inspector，并确认它对应当前镜像中的页面",
            mode="compose",
            expect="Safari Web Inspector 连接真实 iPhone 的 Obsidian WebView",
            on_failure="请求用户在 iPhone 的 Safari 高级设置中启用 Web Inspector，保持 Obsidian 在前台后重新连接；不要检查错误设备或错误页面",
        )}。
        """,
        reads=["device_name", "runtime_state"],
        writes=["inspector_state"],
        ask_user="Safari 开发菜单中没有目标 Obsidian 页面时，请启用设备 Web Inspector 并保持 Obsidian 在前台。",
    ),
    step(
        "capture_visual_states",
        f"""
        使用 {call_skill(
            "computer-use:computer-use",
            how="在 iPhone 镜像中逐一触发目标状态并把完整设备视口截图保存到 artifact_dir；需要软键盘、菜单滚动或安全区时必须让对应状态真实可见",
            mode="compose",
            expect="每个待判断状态都有真机镜像截图",
            on_failure="记录未能自动完成的手势，并只请求用户执行该手势后继续采集",
        )}。
        """,
        reads=["task", "acceptance_plan", "artifact_dir", "reproduction_log"],
        writes=["screenshot_paths"],
    ),
    step(
        "measure_in_inspector",
        f"""
        使用 {call_skill(
            "computer-use:computer-use",
            how="在 Safari Inspector 的 Elements/Console 中记录 navigator.userAgent、document.body.className、CSS viewport、devicePixelRatio、clientWidth/scrollWidth、目标 selector、getBoundingClientRect，以及与问题相关的 color/background/border/radius/opacity/overflow/transform；同时记录主题相关错误",
            mode="compose",
            expect="Inspector 测量与同一时刻的镜像截图可以对应",
            on_failure="保留镜像截图并明确 Inspector 证据缺失，不把视觉推断写成测量事实",
        )}。
        """,
        reads=["task", "inspector_state", "screenshot_paths"],
        writes=["inspector_evidence"],
    ),
    step(
        "report",
        "按场景交叉引用镜像截图与 Inspector 测量，报告设备、系统、Obsidian、vault、运行时状态类、通过项、问题和阻塞项。",
        reads=["mirror_state", "runtime_state", "reproduction_log", "screenshot_paths", "inspector_evidence"],
        writes=["device_report", "findings"],
    ),
])

decision_rules([
    when("iPhone 镜像不可用但 Safari Inspector 可连接", then="只记录 DOM 诊断，不宣称真机视觉验收完成"),
    when("Safari Inspector 页面与镜像当前场景不一致", then="重新选择正确的 device/Obsidian/localhost 页面后再测量"),
    when("运行时类是否包含 is-phone、is-ios 或 theme-dark 不确定", then="读取 document.body.className，不凭经验假设"),
    when("需要临时注入 CSS 定位 selector 或优先级", then="只在 Inspector 中做可恢复探针，明确标记临时值，并通过重新加载清除"),
    when("截图可能包含真实 vault 内容", then="仅保存到本地未跟踪 artifact_dir，不加入公开仓库"),
    when("用户同时要求修改源码", then="先完成真机诊断证据；持久化修改、提交与发布需要后续明确授权"),
])

quality_bar(
    must=[
        "iPhone 镜像画面与 Safari Inspector 必须来自同一台真实设备和同一 Obsidian 页面。",
        "报告设备、iOS、Obsidian、vault、CSS viewport、DPR 和运行时状态类。",
        "每个视觉结论引用镜像截图；每个样式或布局结论引用 Inspector selector 和测量值。",
        "滚动、软键盘、安全区、按下或选中问题必须真实触发对应状态。",
    ],
    should=[
        "深浅色和关键交互状态使用一致场景名成对截图。",
        "对比度问题记录前景色与背景色，溢出问题记录 rect、clientWidth 和 scrollWidth。",
    ],
    must_not=[
        "不要使用或修改个人 vault。",
        "不要把模拟器、桌面窗口或静态 CSS 推断说成 iPhone 真机证据。",
        "不要修改源码、git、版本或发布状态。",
        "不要把 Inspector 临时注入描述为已实现修复。",
    ],
)
```
