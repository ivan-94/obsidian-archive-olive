# Archive Olive 文件栏视觉层级优化规范

| 字段            | 值                                                                                                   |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| 状态            | Approved for `0.1.6` beta；Desktop 视觉 P0 已实现，移动端真机与大 vault 验收待完成                   |
| 规范版本        | 0.3.11                                                                                               |
| 创建日期        | 2026-07-26                                                                                           |
| 实验分支        | `codex/experimental-file-explorer-hierarchy`                                                         |
| 目标范围        | Obsidian 原生 File explorer 的主题级视觉优化                                                         |
| 目标平台        | Desktop、iPad、iPhone；Android 保守兼容                                                              |
| 桌面视觉参考    | [`07a-theme-only-file-tree-desktop.png`](../../design/concepts/07a-theme-only-file-tree-desktop.png) |
| iPad 视觉参考   | [`07b-theme-only-file-tree-ipad.png`](../../design/concepts/07b-theme-only-file-tree-ipad.png)       |
| iPhone 视觉参考 | [`07c-theme-only-file-tree-iphone.png`](../../design/concepts/07c-theme-only-file-tree-iphone.png)   |
| 上位视觉规范    | [`DESIGN.md`](../../DESIGN.md)                                                                       |
| 上位主题规范    | [`theme.md`](theme.md)                                                                               |
| 移动端约束      | [`mobile-ios-visual-hardening.md`](mobile-ios-visual-hardening.md)                                   |

## 1. 目的

在不改变 Obsidian 原生文件树信息架构、交互行为和数据能力的前提下，提高 Archive Olive 文件栏中目录、文件、当前项和层级路径的视觉辨识度。

优化后的文件栏应保留原生的：

- 展开与折叠；
- 树形缩进和原生 disclosure 行为；
- 排序、拖拽、重命名和多选；
- 键盘导航与焦点；
- 桌面侧栏和移动端 drawer；
- 社区插件可能依赖的文件浏览器行为。

本规范只授权主题 CSS、已有 Obsidian CSS 变量、稳定组件选择器、伪元素和平台状态类。它不授权 JavaScript、伴生插件或 DOM 重排。

## 2. 背景与问题

当前 [`theme.css`](../../theme.css) 对 `.nav-file-title` 和 `.nav-folder-title` 使用相同的边框、hover 和 active 规则；根目录只额外使用大写、字重和下边线。结果是：

1. 目录与文件主要依靠图标和缩进区分，组件语法过于接近。
2. 所有 active/selected 项获得相似轮廓，当前文件、选中目录和祖先目录缺少明确角色。
3. 深层树主要依赖浅色缩进线，长目录中当前上下文不易快速定位。
4. 移动端需要更大的触控行高，但简单放大桌面规则会让抽屉显得拥挤。
5. 早期设计尝试把目录改成卡片或单层索引导航，虽然有辨识度，但改变了信息架构，超出主题能力范围。

## 3. 设计原则

1. **树仍然是树。** 不隐藏父子关系，不用视觉手段伪装成另一种导航模型。
2. **目录组织版面。** 目录通过排版、留白、字重和标记表达“容器”。
3. **文件承载交互。** 文件保持轻量；仅当前文件获得明显纸张式状态。
4. **强状态稀缺。** 同一侧栏中只允许当前文件使用最高强调层级。
5. **结构优先于装饰。** 不依赖 emoji、文件类型章、动态计数或假按钮。
6. **移动端不机械缩放。** 保留相同语义，减少位移、阴影和密集装饰。
7. **原生行为优先。** 任何视觉效果都不得破坏命中区域、滚动、截断、拖拽和键盘操作。
8. **低成本选择器优先。** P0 不使用 `:has()`、`!important` 或依赖深层 DOM 序号的脆弱选择器。

## 4. 范围

### 4.1 P0 范围

- 根目录、嵌套目录和文件的三层视觉语法。
- 默认、hover/mobile-tap、active、selected、focus-visible、collapsed 和 expanded 状态。
- 当前文件的高强调状态。
- 由 CSS counter 生成且不污染真实目录名的根目录视觉顺序。
- 无持久纵向 guide 的原生缩进层级。
- 同一树深度的目录与文件名称共享内容起始线。
- 长文件名、深层级、中文、英文、数字和 emoji 文件名。
- Desktop、窄桌面侧栏、iPad drawer 和 iPhone drawer。
- 浅色、深色和现有八套 colorway 的语义颜色继承。
- `test-vault/` 中的隔离运行验收。

### 4.2 P1 范围

- 在不使用 `:has()` 的前提下，利用 Obsidian 已暴露的稳定祖先状态类增强当前路径；如果运行时未暴露稳定类，则该项不进入 P1。
- `prefers-contrast` 下的边界与 focus 增强。

### 4.3 非目标

- 单层目录导航、索引轨或横向进入文件夹。
- 文件夹内容预览和 note preview。
- 动态文件夹计数、修改时间、frontmatter 状态和文件扩展名章。
- 自定义快捷操作按钮或 hover action tray。
- 搜索结果重组、分组或面包屑增强。
- 修改 Obsidian 排序、拖拽、重命名、打开方式或移动端手势。
- 使用真实个人 vault 做截图、运行验收或 DOM 检查。
- 为匹配生成图而复刻不存在的 Obsidian 控件。

### 4.4 实验治理

- 本功能在 `codex/experimental-file-explorer-hierarchy` 分支中开发、验证和保存实验截图。
- 每一阶段的 CSS 变更必须可独立撤销；不得与无关主题修复混合提交。
- 用户于 2026-07-27 明确批准合并到主分支并发布 patch；因此桌面 P0
  进入 `0.1.6` beta 候选。
- 合并批准不扩大验收结论：移动端真机和大 vault 虚拟滚动仍须单独验证。
- 合并评审至少需要：
  - Desktop 浅色/深色和窄侧栏的前后对比；
  - iPad 与 iPhone 原生 drawer 的真实设备结果；
  - 原生展开、折叠、拖拽、重命名、多选和键盘导航无回归；
  - `node scripts/validate.mjs --release` 通过；
  - `DESIGN.md` 与本规范的 active-file 冲突已经解决。
- 若任一平台出现命中区域错位、水平溢出、明显滚动性能下降或个人 vault 依赖，实验不得进入主线。

## 5. 视觉模型

### 5.1 根目录：章节断点

根目录承担全局扫描和大分区作用。

要求：

- 使用比文件更高的字重和略大的字符间距。
- 名称可使用 uppercase；中文、emoji 和无大小写脚本不得被替换或隐藏。
- 使用 CSS counter 按当前视觉顺序生成独立的两位数编号；编号不得写入目录名、
  路径或 frontmatter。
- 下划线开头的工具目录（例如 `_quickadd`）保持原生轻量外观，不参与章节编号。
- 根目录上方保留适度 section gap；相邻根目录不能合并成连续卡片墙。
- 使用 olive 编号章；仅 expanded 根目录从标题之后向右延伸 `1px` rule。
- disclosure 点击区域和行为必须保留；视觉符号使用固定槽位的 `+ / −`，
  不使用旋转 chevron。
- 默认状态不使用整行实色背景，不使用厚矩形框。
- collapsed 与 expanded 至少通过 `+ / −`、字重或短标记中的两项形成冗余差异。

非要求：

- 编号不是持久 ID，不承诺在排序、筛选或目录变化后保持不变。
- 不显示文件数量，也不要求用户人工维护序号。

### 5.2 嵌套目录：活页标签

嵌套目录承担局部容器和路径节点作用。

要求：

- 保持原生缩进、disclosure 点击区域和键盘行为。
- 字重介于根目录与文件之间。
- 使用短 olive rule、方形 registration mark 或轻微 tonal wash 中的一种，不同时堆叠全部效果。
- expanded 状态可以使用非常轻的背景差，但不能看起来像当前文件。
- collapsed 状态保持平面，不使用投影。
- 名称截断必须保留 native ellipsis 和 tooltip 行为。

### 5.3 文件：纸面条目

文件承担可打开内容的角色。

要求：

- 默认文件无常驻外框、无常驻阴影、无伪造元数据。
- 字重低于目录；颜色必须仍满足普通文字对比度要求。
- 行与行之间使用留白或极轻 baseline，不把每个文件做成卡片。
- hover/mobile-tap 使用短 cyan tick 或低强度 tonal change，不产生明显布局跳动。
- 文件图标或 Obsidian 原生 affordance 不得被隐藏到无法辨认对象类型。

### 5.4 当前文件：行内纸色标记

当前文件是侧栏唯一的最高强调对象。

要求：

- 继承普通文件的自然高度、padding 和 margin。
- 使用与普通文件不同的 surface。
- 使用文字字重作为非颜色线索。
- 浅色和深色模式的文字对比度均不低于 `4.5:1`。
- 不依赖圆角、透明度或颜色单独表达 active。
- 不使用 cyan inline edge、tick 或 registration mark。
- 不增加 active-only 高度、padding、margin、位移、outline、折角或外投影。

iPad/iPhone：

- 保持 `44px` 共享触控行高。
- 使用文字字重和 surface 差表达 active，不增加 cyan marker。

### 5.5 当前路径

P0：

- 当前文件自身必须明确。
- 不渲染持久纵向缩进 guide，避免整棵树成为轨道或线框图。
- 不使用 `:has()` 推导祖先路径。

P1 候选：

- 仅当 Obsidian 在祖先目录暴露稳定状态类时，使用该状态类增强父目录文字或背景。
- 若没有稳定状态类，保持 P0，不通过复杂选择器扫描整棵树。

明确禁止：

- 为实现视觉稿中的祖先路径，在正式主题中引入 `.nav-folder:has(...)`。
- 修改当前 `scripts/validate.mjs` 的无 `:has()` 门禁，除非另立架构决策并完成大型 vault 性能证据。

## 6. 状态矩阵

| 对象     | 状态                 | 视觉要求                                              | 禁止                                  |
| -------- | -------------------- | ----------------------------------------------------- | ------------------------------------- |
| 根目录   | Default              | 高字重、章节留白、短 olive mark、quiet rule           | 整行实底、厚框、投影                  |
| 根目录   | Hover / mobile-tap   | 文字或 disclosure 增强；可增加低强度 surface          | 横向位移、伪造按钮                    |
| 根目录   | Expanded             | `−` + 字重/标记形成冗余状态                           | 冒充当前文件                          |
| 嵌套目录 | Default              | 中等字重、原生缩进、短局部标记                        | 与普通文件完全同形                    |
| 嵌套目录 | Expanded             | 轻 tonal wash 或标记增强                              | 硬阴影                                |
| 文件     | Default              | 轻量、无框、无阴影                                    | 每行卡片化                            |
| 文件     | Hover / mobile-tap   | 轻 surface 或文字颜色变化                             | cyan tick；与 active 相同的整块强调   |
| 文件     | Active               | 自然行高 + 独立 surface + weight                      | cyan marker；独立卡片几何；仅靠颜色   |
| 任意项   | Selected / multi     | 与 active 不同的细 outline 或选区规则                 | 把多选项全部表现成当前文件            |
| 任意项   | Focus-visible        | 现有 cyan focus ring，至少 `3:1` 非文字对比           | 用 hover 替代键盘焦点                 |
| 任意项   | Disabled/unavailable | 保留标签可读性并降低强调                              | `display:none` 或不可辨认的低 opacity |
| 任意项   | Drag target          | 使用 Obsidian 原生 drag target 状态，必要时只增强边界 | transform 导致命中区域和视觉位置分离  |

## 7. 响应式规则

### 7.1 Desktop

- 目标侧栏宽度范围：`240–480px`。
- 默认保持紧凑密度，不强制 `44px` 行高。
- 根目录 section gap 在窄侧栏中可以缩小，但不得归零。
- 当前文件位移仅在不会产生水平溢出时启用。
- 超长目录和文件名必须单行截断；action icon 和 disclosure 不得先于文字消失。
- `200%` UI scale 下仍能折叠、滚动和打开当前文件。

### 7.2 iPad

- 使用 Obsidian 原生 drawer 尺寸和位置，不把 drawer 改造成固定 desktop sidebar。
- 目录和文件的主要触控行高不低于 `44px`。
- 保留现有 `max-width: calc(50vw - 16px)` 和 drawer 不重叠约束，除非真实设备证据支持修改。
- 当前文件使用 inset edge、surface 差与文字字重，不使用 outline 或外投影。
- drawer selector、vault footer 和 safe area 继续遵守现有 iOS hardening 规范。

### 7.3 iPhone

- 保留原生全屏 drawer 与阅读页切换。
- 不新增横向 collection code、edge tab 或自定义返回按钮。
- 目录和文件主要触控行高不低于 `44px`。
- 根目录 rule 可缩短，避免与长名称竞争宽度。
- 当前文件不位移、不外投影、不造成横向 overflow。
- vault footer、帮助、设置按钮和底部安全区保持可见。

### 7.4 Android

- 共享规则以 `body.is-mobile` 保守应用。
- iOS 几何和 safe-area 修复继续限定在 `.is-ios`。
- 本规范不声明 Android 已完成视觉验收；实现不得主动破坏 Android 原生 drawer。

## 8. 主题架构与选择器策略

### 8.1 优先级

1. 优先使用现有 Obsidian navigation variables。
2. 其次使用当前已在主题中采用的稳定选择器。
3. CSS counter 和伪元素只承担视觉顺序、章节线与局部图标，不改变可复制的目录名。
4. 不使用 `!important`、`:has()`、DOM 序号路径或 plugin-specific selector。

### 8.2 预期稳定选择器

实现前必须在目标 Obsidian 版本中重新确认：

- `.nav-files-container`
- `.nav-folder`
- `.nav-folder-children`
- `.nav-folder-title`
- `.collapse-icon`（Obsidian 1.12.7 当前文件树 disclosure 节点）
- `.nav-folder-collapse-indicator`（仅作旧版兼容，不作为当前 DOM 假设）
- `.nav-file-title`
- `.nav-file-title.is-active`
- `.nav-file-title.is-selected`
- `.nav-folder-title.is-selected`
- `:focus-visible`
- `body.is-mobile`
- `body.is-phone`
- `body.is-ios`
- `body.is-tablet`

根目录 direct-child 选择器和 counter 结构必须以真实 DOM 为证，不得只依据生成图或记忆实现。当前运行证据使用
`.nav-folder-title[data-path]:not([data-path*='/']):not([data-path^='_'])`
识别章节目录，并在 `.nav-files-container` 重置视觉顺序。

### 8.3 Token 策略

颜色优先复用：

- `--interactive-accent`
- `--background-primary`
- `--background-secondary`
- `--background-secondary-alt`
- `--background-modifier-border`
- `--text-normal`
- `--text-muted`
- `--ao-cyan` / `--ao-dark-cyan`
- `--ao-folder`
- `--ao-olive` / `--ao-dark-olive`

允许新增的结构 token：

```css
--ao-nav-root-gap: 2px;
--ao-nav-counter-width: 22px;
--ao-nav-disclosure-slot: 18px;
--ao-nav-file-marker-offset: -10px;
```

上述 Desktop 数值已在 `327px` 文件栏与 Obsidian `1.12.7` 中复核；移动端仍由
`44px` 触控行高与无外部阴影规则覆盖。

## 9. 与现有规范的关系

### 9.1 `DESIGN.md`

`DESIGN.md` 的发布线基线曾要求 active file 使用 full-width olive block。本规范提出改为
自然文件行上的 paper/recessed surface + weight，以增强目录与文件的对象差异并降低侧栏视觉重量。

本实验已经获准在独立分支实现，`DESIGN.md` 的 File explorer and navigation lists
小节已在同一变更中改为 natural row + paper/recessed surface + weight，不使用青色标记。该修改只描述
当前实验分支；在产品负责人明确批准合并前，不代表正式发布线已经采用新规则。

### 9.2 `theme.md`

- 继续遵守 native behavior、无伴生插件、无网络依赖、WCAG AA 和稳定选择器要求。
- P0 不改变 `AO-012` 的无 `:has()` 性能门禁。
- 文件栏变化必须补充到 navigation state hierarchy 的验收证据中。

### 9.3 `mobile-ios-visual-hardening.md`

该规范曾冻结桌面端，以保护移动端修复。本文件是独立的新设计工作，只在获批后授权修改 File explorer 相关桌面选择器；其他桌面 shell、editor、menu 和 mobile hardening 仍保持冻结。

## 10. 实施计划

### 阶段 0：运行证据与基线

1. 在 `test-vault/` 中补齐深层目录、长名称、中英文、emoji、空目录和多文件 fixture。
2. 确认 `test-vault/.obsidian/themes/Archive Olive/` 继续链接当前工作树。
3. 在固定 Obsidian 版本、窗口尺寸和 colorway 下采集桌面浅色/深色文件栏基线。
4. 在真实 Obsidian DOM 中记录文件、目录、根目录、active、selected、focus 和 drag target 的类与 computed style。
5. 在 iPad 和 iPhone 的隔离 `test-vault/` 中确认 drawer DOM 与触控尺寸。

### 阶段 1：P0 桌面层级

1. 增加结构 token，不新增独立硬编码颜色。
2. 分离 `.nav-folder-title` 与 `.nav-file-title` 的默认样式。
3. 实现根目录章节断点。
4. 实现嵌套目录和普通文件的视觉差异。
5. 实现 active、selected、hover 和 focus-visible 的独立状态。
6. 验证无 guide 的缩进可读性、长名称、深层级和滚动。

### 阶段 2：移动端适配

1. 使用 `body.is-mobile` 覆盖行高、位移和阴影。
2. 使用 `.is-phone` 禁用 active file 位移与外投影。
3. 使用 `.is-ios.is-tablet` 验证 drawer 宽度和现有 iPad hardening。
4. 检查 Android 共享规则不出现明显回归。

### 阶段 3：P1 实验

1. 评估是否存在稳定祖先状态类；不存在则关闭当前路径增强。
2. 在大型文件树中测量 counter、selector 和 repaint 表现。
3. 只有通过性能、可读性和跨平台验收的实验才进入默认主题。

### 阶段 4：验证与文档

1. 运行静态校验和 CSS parser。
2. 在真实 Obsidian Desktop 使用 `test-vault/` 完成浅色、深色、窄宽和键盘矩阵。
3. 在真实 iPad 和 iPhone 使用隔离 `test-vault/` 完成 drawer 验收。
4. 更新 `DESIGN.md`、`VALIDATION.md`、`CHANGELOG.md` 和相关截图。
5. 对比设计参考时只检查设计原则和状态关系，不要求像素级复刻生成图。

## 11. 功能需求

### P0

| ID      | 要求                       | 验收                                                                                         |
| ------- | -------------------------- | -------------------------------------------------------------------------------------------- |
| FEX-001 | 保留原生文件树行为         | 展开、折叠、打开、重命名、拖拽、排序、多选、滚动和键盘导航无回归。                           |
| FEX-002 | 根目录形成章节层级         | 根目录无需依赖图标即可与文件区分；不出现连续实色卡片墙。                                     |
| FEX-003 | 嵌套目录与文件可快速区分   | 遮住图标后，仍可通过字重、留白、标记和状态辨认容器与内容。                                   |
| FEX-004 | 当前文件成为唯一强状态     | 同一文件栏中仅当前文件使用最高强调；hover、selected 和 focus 不冒充 active。                 |
| FEX-005 | 状态具备冗余线索           | default、hover/tap、active、selected、focus、expanded 至少使用颜色以外的一项线索。           |
| FEX-006 | 深层与长名称保持可用       | 深度至少 5 层、长英文、中文和 emoji 名称可截断、滚动和操作，无水平页面溢出。                 |
| FEX-007 | 移动端触控与安全区         | iPad/iPhone 主要树行不低于 `44px`；drawer、vault footer 和 safe area 无裁切或覆盖。          |
| FEX-008 | 浅色、深色和 colorway 兼容 | 默认浅色/深色完整验收；其他 colorway 通过语义 token 继承且无明显对比度失败。                 |
| FEX-009 | 可访问性                   | 普通文字对比度 ≥ `4.5:1`；关键边界 ≥ `3:1`；键盘焦点清晰；`200%` UI scale 不丢失主要操作。   |
| FEX-010 | 性能与选择器门禁           | 无 `:has()`、`!important`、远程资源、持续动画或大范围 filter；大文件树滚动和展开无明显卡顿。 |
| FEX-011 | 顺序与真实名称分离         | 两位数编号由 CSS counter 按视觉顺序生成；真实目录名和路径不含显示序号；工具目录不参与编号。  |

### P1

| ID      | 要求             | 验收                                                                      |
| ------- | ---------------- | ------------------------------------------------------------------------- |
| FEX-101 | 稳定祖先状态增强 | 仅使用运行时已暴露的稳定祖先类；没有稳定类时明确不实现。                  |
| FEX-104 | 高对比模式       | `prefers-contrast` 下移除弱装饰并增强边界、outline 和 focus，不改变布局。 |

## 12. 验收矩阵

### 12.1 Desktop

每个场景至少覆盖默认浅色和默认深色：

| 场景       | 必测状态                                                     |
| ---------- | ------------------------------------------------------------ |
| 稀疏文件栏 | collapsed root、普通文件、空白区域                           |
| 密集文件栏 | 6+ 根目录、5 层嵌套、30+ 可见条目、滚动                      |
| 当前上下文 | active file、selected file、expanded folder、active tab      |
| 输入方式   | mouse hover、keyboard focus、arrow navigation、multi-select  |
| 文件操作   | rename、drag target、drop、context menu                      |
| 宽度       | `240px`、`320px`、`480px`                                    |
| 内容       | 长英文、简体中文、数字、标点、emoji、无空格长字符串          |
| 外观       | light、dark、window focused、window blurred、`200%` UI scale |

### 12.2 iPad

- 浅色与深色 drawer 打开、关闭和滚动。
- 当前文件、普通文件、expanded/collapsed folder。
- drawer selector 展开与折叠。
- 左右 drawer 不重叠。
- 主要行和按钮 `44 × 44px` 触控区域。
- vault footer 和底部 safe area。

### 12.3 iPhone

- 浅色与深色 drawer。
- 长文件树滚动。
- 当前文件、selected、mobile-tap 和 focus 恢复。
- drawer 与阅读页往返。
- vault footer、帮助、设置和底部 safe area。
- `393 × 852` CSS px 基准视口无水平溢出。

### 12.4 静态与自动验证

至少执行：

```bash
node scripts/validate.mjs
npx --yes lightningcss-cli@1.33.0 theme.css --output-file /tmp/archive-olive-file-explorer.css
npx --yes prettier@3.9.6 --check theme.css docs/specs/file-explorer-visual-hierarchy.md
```

实现完成后再执行：

```bash
node scripts/validate.mjs --release
```

`--release` 只在 release 相关文档、截图和版本记录同步后运行；规格阶段不要求发布。

## 13. 通过条件

- AC-FEX-001：目录与文件在不依赖图标时仍有明显但克制的视觉差异。
- AC-FEX-002：文件树行为与原生 Obsidian 一致，没有新增导航模型。
- AC-FEX-003：普通文件保持轻量，只有当前文件使用最高强调。
- AC-FEX-004：hover、selected、active 和 focus-visible 不互相混淆。
- AC-FEX-005：深层树和长名称无横向页面溢出或命中区域错位。
- AC-FEX-006：Desktop、iPad 和 iPhone 均使用同一语义系统，但移动端无外部位移与阴影。
- AC-FEX-007：浅色、深色普通文字对比度 ≥ `4.5:1`，关键边界 ≥ `3:1`。
- AC-FEX-008：P0 不含 `:has()`、`!important`、插件依赖或远程资产。
- AC-FEX-009：所有运行验收均使用仓库 `test-vault/`，未读取或修改个人 vault。
- AC-FEX-010：生成图仅作为方向参考；真实 Obsidian DOM、行为和可访问性优先于像素复刻。

## 14. 风险与开放问题

1. `DESIGN.md` 已在实验分支同步；合并前仍需产品负责人确认这项上位规范变更。
2. Obsidian 可能不会给祖先目录暴露稳定 active-path 类；P0 不承诺祖先路径显影。
3. CSS counter 会随排序、筛选和虚拟化渲染窗口变化；进入主线前必须验证大型
   vault 长距离滚动不会让可见编号产生误导性重置。
4. 无持久纵向 guide 后，极深层级主要依赖缩进和 folder glyph；必须保留深层与窄栏验收。
5. 生成图展示的字体比例和控件位置不是运行时证据。
6. iPhone 与 iPad 的 drawer DOM 已有平台差异；共享规则必须保守，iOS 例外继续隔离。
7. 八套 colorway 全量截图成本较高；默认浅/深做完整验收，其余先做 token/contrast smoke test。

## 15. 当前实现状态

| 范围                             | 状态    | 证据                                                                                        |
| -------------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| 视觉顺序与真实名称分离           | Pass    | 目录名恢复为 `Assets / Questions…`；CSS counter 生成 `01 / 02…`，`_quickadd` 不参与编号。   |
| 根目录章节断点                   | Pass    | `32px` 行高、`2px` section gap、olive 两位数编号章；仅展开目录延伸 quiet rule。             |
| 嵌套目录活页标签                 | Pass    | 展开目录使用 `600` 字重、`16px` folder glyph 与 recessed surface，不使用纵向 inset rail。   |
| 同级目录与文件文字对齐           | Pass    | 文件文字对齐同层目录的首个可见锚点：根层序号章，嵌套层 folder glyph。                       |
| Disclosure 符号与行为            | Pass    | 原生 SVG 替换为 `+ / −`；所有目录层级共用右侧 `18px` 状态槽。                               |
| 普通文件与当前文件分离           | Pass    | 当前文件继承普通文件自然行高，仅增加 paper/recessed surface 与 `600` 字重，不使用青色标记。 |
| Desktop 深浅模式                 | Pass    | Obsidian Desktop `1.12.7`、macOS、隔离 `test-vault/` 截图与 computed style 复核。           |
| Desktop 水平溢出                 | Pass    | `327px` 文件栏中 `clientWidth === scrollWidth`，无横向溢出。                                |
| 静态规则与 CSS 解析              | Pass    | `node scripts/validate.mjs` 与 Lightning CSS parser 通过。                                  |
| Mobile 共享约束                  | Static  | `44px` 最小行高、active 无位移且仅使用 inset edge；真实 iPad/iPhone 验收待完成。            |
| 多选、重命名、拖拽、键盘完整矩阵 | Pending | 进入主线前完成，不在本轮 Desktop 视觉 P0 中声称通过。                                       |
| 其余 colorway 与 Windows/Linux   | Pending | 当前仅默认 Archive Olive / Archive Night 完整查看。                                         |

## Source Manifest

### Sources

- User direction in this Codex task on 2026-07-26:
  - requested exploration of what Obsidian sidebars can do;
  - rejected the first card-like redesign as visually unattractive and structurally too similar to the existing tree;
  - found the index-rail concept interesting but confirmed that it exceeded theme capabilities;
  - requested a new design and implementation spec constrained to theme-only changes.
- User correction in this Codex task on 2026-07-27:
  - the first runtime implementation remained materially different from the
    approved design;
  - `01 / 02…` are visual order markers, not characters in directory names;
  - implementation should return to the generated design's chapter counters,
    expanded rules, path guides and extracted active-paper state.
- User visual critique in this Codex task on 2026-07-27:
  - the native `>` folding arrow was the most objectionable remaining detail;
  - disclosure must lose the rotating-chevron appearance without replacing
    Obsidian's native expand/collapse interaction.
- User density critique in this Codex task on 2026-07-27:
  - disclosure symbols were not optically centered in their rows;
  - the active paper card was oversized;
  - consecutive collapsed root chapters had excessive vertical separation.
- User boundary correction in this Codex task on 2026-07-27:
  - centering the glyph inside Obsidian's negatively offset disclosure wrapper
    was insufficient;
  - the collapsed `+` must sit fully inside the folder row background instead
    of straddling its inline-start boundary.
- User active-state simplification in this Codex task on 2026-07-27:
  - the active file still looked like an oversized standalone card;
  - active state must use the file row's natural height and remove the outline,
    fold, external shadow, and extra spacing.
- User guide-removal direction in this Codex task on 2026-07-27:
  - persistent vertical indentation guides should be removed;
  - hierarchy should rely on indentation, folder glyphs, tonal expanded state,
    and disclosure symbols instead of rails.
- User sibling-alignment direction in this Codex task on 2026-07-27:
  - folder and file items at the same tree depth should align.
- User marker-edge clarification in this Codex task on 2026-07-27:
  - files and folders shown under the same parent are the same depth;
  - file text aligns with the sibling folder's first visible marker edge:
    sequence badge at root depth and folder glyph at nested depths;
  - the active surface does not define that alignment edge.
- User trailing-disclosure direction in this Codex task on 2026-07-27:
  - folding indicators should move from the leading edge to the right side;
  - root, nested, and utility folders should share one trailing state axis;
  - expanded chapter rules must stop before the trailing indicator.
- User leading-gutter and cyan-marker direction in this Codex task on
  2026-07-27:
  - reclaim the leading space vacated after disclosure moved right;
  - remove the blue/cyan marker from file states;
  - active state should rely on its surface and text weight.
- User full-width row direction in this Codex task on 2026-07-27:
  - file and folder row surfaces should span the complete file-list container;
  - the disclosure control should retain its safe inset inside the full-width
    row.
- User-provided current-sidebar screenshot in the Codex task. The original file was under an OS temporary path and is not copied into the repository because it contains personal vault names and note titles.
- [`design/concepts/07a-theme-only-file-tree-desktop.png`](../../design/concepts/07a-theme-only-file-tree-desktop.png)
- [`design/concepts/07b-theme-only-file-tree-ipad.png`](../../design/concepts/07b-theme-only-file-tree-ipad.png)
- [`design/concepts/07c-theme-only-file-tree-iphone.png`](../../design/concepts/07c-theme-only-file-tree-iphone.png)
- Rejected plugin-scale exploration retained for decision history:
  - [`design/concepts/05-sidebar-archive-index-navigation.png`](../../design/concepts/05-sidebar-archive-index-navigation.png)
  - [`design/concepts/06a-archive-index-desktop.png`](../../design/concepts/06a-archive-index-desktop.png)
  - [`design/concepts/06b-archive-index-ipad.png`](../../design/concepts/06b-archive-index-ipad.png)
  - [`design/concepts/06c-archive-index-iphone.png`](../../design/concepts/06c-archive-index-iphone.png)
- [`DESIGN.md`](../../DESIGN.md)
- [`docs/specs/theme.md`](theme.md)
- [`docs/specs/mobile-ios-visual-hardening.md`](mobile-ios-visual-hardening.md)
- [`theme.css`](../../theme.css), especially the existing `.nav-file-title` and `.nav-folder-title` rules.
- [`scripts/validate.mjs`](../../scripts/validate.mjs), including the current no-`:has()` release gate.
- [`AGENTS.md`](../../AGENTS.md), requiring all Obsidian acceptance to use the isolated `test-vault/`.
- `~/.agents/docs/agents/workflows.md`
- `~/.agents/docs/agents/handoff-policy.md`

### Produced artifacts

- `docs/specs/file-explorer-visual-hierarchy.md`
- Updated `docs/specs/README.md`
- Updated `DESIGN.md`
- Updated `theme.css`
- Updated `scripts/validate.mjs`
- Isolated file-tree fixtures under `test-vault/Assets/` through
  `test-vault/Synthesis/`, plus `test-vault/_quickadd/`
- Desktop runtime evidence:
  - `validation/screenshots/experimental-file-explorer-dark.jpg`
  - `validation/screenshots/experimental-file-explorer-light.jpg`
- Referenced design artifacts:
  - `design/concepts/07a-theme-only-file-tree-desktop.png`
  - `design/concepts/07b-theme-only-file-tree-ipad.png`
  - `design/concepts/07c-theme-only-file-tree-iphone.png`

### Key decisions

- Preserve the native Obsidian tree and drawer behavior; improve hierarchy through CSS only.
- Keep implementation and acceptance work isolated on
  `codex/experimental-file-explorer-hierarchy` until explicit product approval;
  the user granted that approval for the `0.1.6` beta candidate on 2026-07-27.
- Treat root folders, nested folders and files as three visual roles.
- Reserve the strongest visual state for the active file.
- Keep active-file geometry identical to a natural file row on every platform;
  mobile differs only through the shared `44px` touch-row rule.
- Keep `:has()` outside P0 and preserve the repository's current validation gate.
- Generate root numbering from current visual order without putting digits in
  folder names; underscore-prefixed utility folders remain unnumbered.
- Do not persist the user screenshot because it contains personal vault content.
- Use the runtime-confirmed root selector
  `.nav-folder-title[data-path]:not([data-path*='/'])`; Obsidian's virtualized
  file tree does not expose a reliable root wrapper depth for this purpose.
- Use `.tree-item-icon.collapse-icon` as the Obsidian `1.12.7` disclosure DOM;
  keep `.nav-folder-collapse-indicator` only as a compatibility fallback.
- Place disclosure after folder content in a shared trailing `18px` slot.
  `margin-inline-start: auto` protects the slot from long labels, while the
  expanded root rule occupies only the space between title and indicator.
- Remove the obsolete container inline padding. This lets file and folder row
  surfaces span the complete file-list width without changing native depth
  indentation; row padding still protects text and the right-side state axis.
- Keep active files free of geometry overrides and detached-card decoration;
  paper/recessed surface and `600` weight carry the state. Do not add a cyan
  edge or hover tick.
- Remove persistent `.nav-folder-children` borders and expanded-folder inset
  rails; keep the horizontal root chapter rule.
- Align file content without moving the native file row: both root and nested
  files use the measured `-10px` offset. This places file text on the sibling
  folder's first visible marker edge while preserving native hit targets.

### Verification evidence

- Read-only audit of `theme.css`, `DESIGN.md`, `docs/specs/theme.md`, `docs/specs/mobile-ios-visual-hardening.md`, `VALIDATION.md`, `scripts/validate.mjs`, and existing test-vault fixtures.
- Confirmed current validation rejects `:has()`, `!important`, remote CSS assets and imports.
- Confirmed `test-vault` runtime links and isolated-vault policy are already documented by repository rules.
- Added red-green static constraints for root folders, nested folders, active
  files, non-active selections, and mobile row geometry.
- `node scripts/validate.mjs` passes after implementation.
- `npx --yes lightningcss-cli@1.33.0 theme.css --output-file
/tmp/archive-olive-experimental.css` parses successfully.
- Obsidian Desktop `1.12.7` on macOS loaded the working-tree theme through the
  repository symlink in isolated `test-vault/`.
- Runtime computed styles:
  - chapter folders expose generated `01–07` markers in visual order while
    `_quickadd` exposes no counter marker;
  - the native disclosure SVG is visually suppressed; the current
    `.collapse-icon` renders `+` while collapsed and `−` while expanded in a
    cross-axis-centered trailing `18px` wrapper;
  - root, nested, and `_quickadd` rows place that wrapper at `x=334` inside a
    row spanning `x=60–363`, leaving `11px` to the row edge and forming one
    right-side state axis;
  - the expanded root rule ends before the indicator, leaving approximately
    `9px` between the rule and the centered `−`;
  - after a full application quit and relaunch, no temporary probe remained;
    `_quickadd`, `Archive`, `Archive/2026`, and
    `Archive/2026/Research operations` all resolved to the same
    `x=334–352` trailing slot;
  - clicking the right-side indicator on `Archive/2026` hid and restored its
    children; a temporary long-label stress test stopped text at `x=334`
    without moving the indicator or introducing overflow;
  - removing the obsolete leading container padding moves root markers and
    same-depth file text from `x=75` to `x=63`, while the right-side indicator
    remains `x=334–352` and the pane remains `327/327`;
  - active file computed style retains its paper surface and `600` weight with
    `box-shadow: none`; cyan hover and active pseudo-markers are absent;
  - after a full application quit and relaunch, no temporary probe remained;
    at a user-resized `331px` pane, rows span `x=48–367`, root marker and file
    text share `x=63`, the trailing slot remains protected at `x=338–356`, and
    `clientWidth === scrollWidth === 331`;
  - removing the remaining trailing container padding expands the container,
    active file, and root folder surfaces together to `x=48–379`; the trailing
    slot remains inset at `x=350–368` with an `11px` edge gap and no overflow;
  - after a full application quit and relaunch, no full-width probe remained;
    both container paddings resolved to `0`, file and folder rows still matched
    the container at `x=48–379`, and the trailing slot retained the same safe
    inset;
  - collapsed root chapters measure `32px` high with a `2px` margin and advance
    at a compact `34px` rhythm;
  - nested folders use a local `16px` masked folder glyph;
  - working-tree rules set `.nav-folder-children` to `border-inline-start: 0`,
    while expanded nested folders and selected folders use no inset box-shadow
    rail;
  - the earlier folder-name/file-text target (`x=113/x=113` nested and
    `x=105/x=105` root) was rejected after the alignment reference was
    clarified;
  - a temporary runtime probe established the shared `-10px` file-content
    offset; after implementation and a full Obsidian restart, the working-tree
    token resolved to `-10px` with no probe present;
  - `Archive/未命名.md` text and the sibling `Archive/2026` folder glyph both
    resolve to `x=91`;
  - `00 - Theme Showcase.md` text and the sibling `Synthesis` sequence badge
    both resolve to `x=75`;
  - marker alignment does not move disclosure hit areas or active-paper
    surfaces; file rows remain `clientWidth === scrollWidth === 301`, and the
    file pane remains `clientWidth === scrollWidth === 327`;
  - active file inherits the same natural row height as adjacent files and adds
    only paper/recessed background, ink text, and `600` weight; it has no cyan
    marker, geometry override, outline, fold, or external shadow;
  - file pane: `clientWidth 327px`, `scrollWidth 327px`, no horizontal overflow.
- Deep and active-file interaction screenshots are persisted under
  `validation/screenshots/experimental-file-explorer-{dark,light}.jpg`.

### Open questions / risks

- Runtime inspection did not reveal a stable ancestor-path state; P0 therefore
  does not enhance ancestor folders.
- Root counters can reset under virtualized long-distance scrolling; large-vault
  evidence is required before mainline approval.
- Active-file emphasis is intentionally in-row; do not reintroduce geometry
  overrides or detached-card decoration during later polish.
- Final iPhone and iPad acceptance requires the repository `test-vault/` on the target devices.
