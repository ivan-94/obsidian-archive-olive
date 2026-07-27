---
name: debug-obsidian-ipad
description: 在真实 iPad 上通过 Xcode Device Hub 操作 Obsidian、用 devicectl 采集原始分辨率截图，并用 Safari Web Inspector 检查 DOM 与 computed style。用于用户明确要求 iPad 真机主题调试、横竖屏验收、截图或运行时测量时。
---

```python
from skill_contract import *

skill(
    name="debug-obsidian-ipad",
    purpose="结合 Device Hub、devicectl 与 Safari Web Inspector 调试真实 iPad 上的 Obsidian 主题。",
)

activate_when([
    "用户明确要求在真实 iPad 上调试或验收 Obsidian 主题",
    "用户要求用 Xcode Device Hub 查看或操作 iPad 上的 Obsidian",
    "用户要求采集 iPad 原始分辨率截图、横竖屏证据、DOM、computed style、视口或安全区测量",
])

do_not_activate_when([
    "用户只要求 iPad Simulator 或桌面浏览器验证",
    "用户要求 iPhone 镜像、Android 或 macOS Obsidian Desktop 验收",
    "用户只要求静态修改 CSS，不要求真实 iPad 运行时证据",
])

inputs(
    required=[
        input("task", type=NaturalLanguage, description="要在真实 iPad 上复现、检查或验收的问题。"),
    ],
    optional=[
        input("device", type=Text, description="iPad 名称、CoreDevice identifier、UDID 或序列号。", required=False),
        input("target_vault", type=Text, description="设备上的专用验收 vault。", default="test-vault", required=False),
        input("artifact_dir", type=Directory, description="本地未跟踪原始截图与测量证据目录。", default="/tmp/debug-obsidian-ipad", required=False),
        input("acceptance_plan", type=Text, description="需要覆盖的横竖屏、深浅色、菜单、抽屉、编辑或键盘状态。", required=False),
    ],
)

outputs(
    required=[
        output("device_report", type=Text, description="Xcode、设备、iPadOS、Obsidian、vault、方向、复现步骤和阻塞项。"),
        output("screenshot_paths", type=Text, description="devicectl 生成的原始分辨率 PNG 路径及尺寸。"),
        output("inspector_evidence", type=Text, description="Safari Inspector 页面、运行时状态类、selector、computed style、几何与视口测量。"),
        output("findings", type=Text, description="有截图与 Inspector 交叉证据的通过项和问题。"),
    ],
)

environment(
    commands=["xcode-select", "mdfind", "open", "xcrun", "sips"],
    dependencies=["Xcode Device Hub", "Safari Web Inspector", "Computer Use"],
    network="not_required",
    filesystem="anywhere_with_user_request",
)

workflow([
    step(
        "resolve_xcode",
        f"""
        使用 {call_tool(
            "xcode-select/mdfind",
            how="先读取 `xcode-select -p`；如果它指向 CommandLineTools 或不兼容的 Xcode，用 mdfind/Applications 定位完整 Xcode.app，并记录版本与 build。为后续命令设置局部 DEVELOPER_DIR，不修改全局 xcode-select",
            expect="一个能识别目标 iPadOS 的完整 Xcode Developer 目录",
            on_failure="报告兼容性阻塞并要求用户安装或升级官方 Xcode；不要自动接受许可协议或更改系统选择",
        )}。
        """,
        writes=["xcode_state", "developer_dir"],
    ),
    step(
        "discover_device",
        f"""
        使用 {call_tool(
            "xcrun devicectl list devices",
            how="以局部 DEVELOPER_DIR 运行 `xcrun devicectl list devices`，只选择 Reality=physical、Model=iPad 且 State=available (paired) 的设备；记录名称、identifier、型号和 iPadOS",
            expect="唯一或由用户明确指定的可用物理 iPad",
            on_failure="请求用户连接、信任、解锁或选择设备；不要退回模拟器并宣称真机通过",
        )}。
        """,
        reads=["device", "developer_dir"],
        writes=["device_state", "device_identifier"],
        ask_user="存在多台物理 iPad、设备未配对或不可用时，请选择设备或完成连接后回复继续。",
    ),
    step(
        "open_device_hub",
        f"""
        使用 {call_tool(
            "open DeviceHub.app",
            how="打开 `<Xcode.app>/Contents/Applications/DeviceHub.app`",
            expect="Device Hub 显示目标物理 iPad",
            on_failure="报告 DeviceHub.app 路径或启动错误",
        )}，再使用 {call_skill(
            "computer-use:computer-use",
            how="在 Device Hub 中选择目标 iPad 并点击 View Screen；若按钮缺失，读取页面给出的 Developer Mode、配对、信任或连接要求",
            mode="compose",
            expect="Device Hub 显示可交互的真实 iPad 画面",
            on_failure="请求用户在 iPad 设置中启用 Developer Mode，并完成重启确认、信任或解锁后重试",
        )}。
        """,
        reads=["xcode_state", "device_state"],
        writes=["device_hub_state"],
        ask_user="Device Hub 要求 Developer Mode、重启确认、信任或解锁时，请在 iPad 上完成后回复继续。",
    ),
    step(
        "open_target",
        f"""
        使用 {call_skill(
            "computer-use:computer-use",
            how="通过 Device Hub 打开 iPad 上的 Obsidian，切换到 target_vault，确认候选主题已启用，记录可观察到的 Obsidian 版本，并按 task/acceptance_plan 到达目标方向和交互状态",
            mode="compose",
            expect="真实 iPad Obsidian 显示专用验收 vault 与目标场景",
            on_failure="报告缺少 vault、主题未同步或目标状态无法到达；不要改用个人 vault",
        )}。
        """,
        reads=["task", "target_vault", "acceptance_plan", "device_hub_state"],
        writes=["runtime_state", "reproduction_log"],
    ),
    step(
        "capture_native_screenshots",
        f"""
        使用 {call_tool(
            "xcrun devicectl device capture screenshot",
            how="为每个目标状态运行 `DEVELOPER_DIR=<developer_dir> xcrun devicectl device capture screenshot --device <device_identifier> --destination <artifact_dir>/<scene>.png`；再用 sips/file 记录 PNG 像素尺寸",
            expect="每个场景都有设备原始分辨率 PNG 和尺寸记录",
            on_failure="报告命令错误；不要把 Device Hub 窗口截图冒充原始设备截图",
        )}。
        """,
        reads=["developer_dir", "device_identifier", "artifact_dir", "reproduction_log"],
        writes=["screenshot_paths", "screenshot_dimensions"],
    ),
    step(
        "attach_web_inspector",
        f"""
        使用 {call_skill(
            "computer-use:computer-use",
            how="在 macOS Safari 的开发菜单中选择 `<iPad> > Obsidian > localhost`，打开对应当前 Device Hub 场景的 Web Inspector",
            mode="compose",
            expect="Safari Web Inspector 连接真实 iPad 的 Obsidian WebView",
            on_failure="请求用户在 iPad 的 Safari 高级设置中启用 Web Inspector，保持 Obsidian 在前台后重连；不要检查错误设备或页面",
        )}。
        """,
        reads=["device_state", "runtime_state"],
        writes=["inspector_state"],
        ask_user="Safari 开发菜单中没有目标 Obsidian 页面时，请启用设备 Web Inspector 并保持 Obsidian 在前台。",
    ),
    step(
        "measure_in_inspector",
        f"""
        使用 {call_skill(
            "computer-use:computer-use",
            how="在 Safari Inspector 的 Elements/Console 中记录 document.body.className、CSS viewport、devicePixelRatio、clientWidth/scrollWidth、目标 selector、getBoundingClientRect，以及相关 color/background/border/radius/opacity/overflow/transform；不要假设 iPad 运行时类",
            mode="compose",
            expect="Inspector 测量与同一方向、同一场景的原始截图可以对应",
            on_failure="保留原始截图并明确 Inspector 证据缺失，不把视觉推断写成测量事实",
        )}。
        """,
        reads=["task", "inspector_state", "screenshot_paths"],
        writes=["inspector_evidence"],
    ),
    step(
        "report",
        "按方向和场景交叉引用原始截图与 Inspector 测量，报告 Xcode、设备、iPadOS、Obsidian、vault、运行时状态类、通过项、问题和阻塞项。",
        reads=["xcode_state", "device_state", "runtime_state", "reproduction_log", "screenshot_paths", "screenshot_dimensions", "inspector_evidence"],
        writes=["device_report", "findings"],
    ),
])

decision_rules([
    when("xcode-select 指向 CommandLineTools", then="为命令设置局部 DEVELOPER_DIR，不要求全局切换或管理员密码"),
    when("Device Hub 只显示 Enable Developer Mode", then="请求用户在 iPad 隐私与安全设置中开启开发者模式并完成重启确认"),
    when("存在多个可用物理 iPad", then="按用户提供的名称或 identifier 选择；仍有歧义时只询问设备选择"),
    when("需要横竖屏矩阵", then="通过 Device Hub 旋转设备并为每个方向单独截图和测量"),
    when("Device Hub 工具栏截图的保存位置不明确", then="以 devicectl capture screenshot 的显式 destination 作为正式证据"),
    when("运行时类是否为 tablet、mobile 或 ios 不确定", then="读取 document.body.className，不凭经验假设"),
    when("截图可能包含真实 vault 内容", then="仅保存到本地未跟踪 artifact_dir，不加入公开仓库"),
    when("用户同时要求修改源码", then="先完成真机诊断证据；持久化修改、提交与发布需要后续明确授权"),
])

quality_bar(
    must=[
        "Device Hub 画面、devicectl 截图与 Safari Inspector 必须来自同一台真实 iPad。",
        "报告 Xcode 版本/build、设备 identifier、型号、iPadOS、Obsidian、vault、方向、CSS viewport、DPR 和运行时状态类。",
        "每个视觉结论引用原始分辨率 PNG；每个样式或布局结论引用 Inspector selector 和测量值。",
        "横竖屏、滚动、软键盘、安全区或选中问题必须真实触发对应状态。",
    ],
    should=[
        "截图文件名包含方向、外观和场景。",
        "对比度问题记录前景色与背景色，溢出问题记录 rect、clientWidth 和 scrollWidth。",
    ],
    must_not=[
        "不要使用或修改个人 vault。",
        "不要把模拟器、Device Hub 窗口截图或静态 CSS 推断说成 iPad 原始真机证据。",
        "不要修改全局 xcode-select、自动接受 Xcode 许可协议或安装不明来源软件。",
        "不要修改源码、git、版本或发布状态。",
        "不要把 Inspector 临时注入描述为已实现修复。",
    ],
)
```
