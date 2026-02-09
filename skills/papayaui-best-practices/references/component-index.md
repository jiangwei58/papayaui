# 组件索引（业务使用视角）

## 使用规则

1. 先按分组定位候选组件，再看功能和场景是否匹配。
2. 回答业务问题时优先给出最小可运行组合，而不是只报组件名。
3. 需要参数细节时再打开对应在线文档。

## 按业务任务反查组件组合

- **任务列表页（筛选 + 分页 + 卡片项）**：`container` + `search` + `tabs/segmented` + `list/list-item` + `loadmore` + `empty`。用于标准任务池、待办列表、记录列表。
- **创建/编辑表单页**：`container` + `form` + `cell` + `input/textarea/input-number` + `calendar/date-picker` + `checkbox/radio/switch` + `button`。用于任务创建、资料编辑、配置录入。
- **多级选择页（地区/组织/类目）**：`container` + `search` + `cascader` 或 `picker-popup/picker-view` + `list` + `button`。用于组织选择、地区选择、字典项选择。
- **详情页（信息分组 + 状态展示）**：`container` + `section` + `cell` + `tag` + `image` + `steps`。用于任务详情、对象详情、流程详情。
- **弹层操作流（确认/选择/二次编辑）**：`popup/bottom-popup/dialog` + `overlay` + `button` + `form`。用于删除确认、快捷编辑、批量操作面板。
- **上传采集页（图片/附件）**：`container` + `uploader` + `image` + `form` + `button`。用于凭证上传、拍照采集、附件补充。
- **索引或分组导航页**：`container` + `index-bar` 或 `sidebar` + `list` + `sticky`。用于品牌索引、分类导航、分组目录页。
- **统计看板页（指标 + 趋势）**：`container` + `count-to` + `circle` + `tag` + `skeleton`。用于运营概览、任务达成率、阶段统计。

## 布局与页面骨架

- **container**：页面级容器，统一承载固定头部、内容区、底部操作区。适用于任务列表、表单页、详情页等需要稳定页面骨架的场景。文档：https://jiangwei58.github.io/papayaui/components/container.html
- **sticky**：粘性布局组件，让筛选栏、分组标题等在滚动时吸顶。适用于长列表筛选、分类导航。文档：https://jiangwei58.github.io/papayaui/components/sticky.html
- **safe-bottom**：底部安全区占位组件，避免按钮被设备底部区域遮挡。适用于 iPhone 刘海屏和全面屏底部操作栏。文档：https://jiangwei58.github.io/papayaui/components/safe-bottom.html
- **section**：区块标题栏组件，用于快速划分内容模块。适用于详情页分段、设置页分组。文档：https://jiangwei58.github.io/papayaui/components/section.html

## 基础展示与内容容器

- **button**：按钮组件，提供主次操作样式与点击反馈。适用于提交、确认、取消、列表操作。文档：https://jiangwei58.github.io/papayaui/components/button.html
- **icon**：图标组件，统一业务图标与状态图标展示。适用于按钮前缀、状态标识、入口指示。文档：https://jiangwei58.github.io/papayaui/components/icon.html
- **image**：图片组件，封装图片显示与常见占位能力。适用于商品图、头像、封面图。文档：https://jiangwei58.github.io/papayaui/components/image.html
- **cell**：单元格组件，用于标准化一行信息展示。适用于设置页、信息详情、可点击列表项。文档：https://jiangwei58.github.io/papayaui/components/cell.html
- **list**：列表容器组件，用于组织成批同结构数据。适用于任务列表、消息列表、商品列表。文档：https://jiangwei58.github.io/papayaui/components/list.html
- **list-item**：列表项组件，作为 `list` 的单条内容承载。适用于统一列表项排版和交互入口。文档：https://jiangwei58.github.io/papayaui/components/list-item.html
- **tag**：标签组件，用于状态、分类、属性的轻量标记。适用于“已完成/待处理/进行中”等状态标识。文档：https://jiangwei58.github.io/papayaui/components/tag.html
- **badge**：徽标组件，用于数字提醒或角标提示。适用于消息未读数、角标通知。文档：https://jiangwei58.github.io/papayaui/components/badge.html
- **empty**：空状态组件，用于无数据场景统一展示。适用于列表为空、搜索无结果、权限为空。文档：https://jiangwei58.github.io/papayaui/components/empty.html
- **skeleton**：骨架屏组件，用于接口返回前的内容占位。适用于首页卡片、列表首屏加载。文档：https://jiangwei58.github.io/papayaui/components/skeleton.html
- **loading-icon**：加载图标组件，用于局部加载状态提示。适用于按钮内加载、局部模块刷新中。文档：https://jiangwei58.github.io/papayaui/components/loading-icon.html
- **watermark**：水印组件，用于页面加注标识文本。适用于截图追溯、敏感页面标记。文档：https://jiangwei58.github.io/papayaui/components/watermark.html
- **circle**：环形进度组件，用于展示比例或完成度。适用于任务进度、指标达成率。文档：https://jiangwei58.github.io/papayaui/components/circle.html
- **count-to**：数字滚动组件，用于数值变化动画展示。适用于看板统计、运营大屏数字动效。文档：https://jiangwei58.github.io/papayaui/components/count-to.html
- **count-down**：倒计时组件，用于显示剩余时间。适用于活动倒计时、超时提醒。文档：https://jiangwei58.github.io/papayaui/components/count-down.html
- **loadmore**：加载更多状态组件，用于分页列表底部状态提示。适用于上拉分页、触底加载反馈。文档：https://jiangwei58.github.io/papayaui/components/loadmore.html
- **collapse**：折叠面板组件，用于内容分块收起/展开。适用于 FAQ、筛选条件折叠、分段详情。文档：https://jiangwei58.github.io/papayaui/components/collapse.html
- **transition**：过渡动画组件，用于显示隐藏时增加动效。适用于弹层、折叠、卡片切换动画。文档：https://jiangwei58.github.io/papayaui/components/transition.html

## 表单与输入

- **form**：表单容器组件，提供规则校验与提交控制。适用于创建任务、编辑资料、复杂录入页。文档：https://jiangwei58.github.io/papayaui/components/form.html
- **field**：基础输入单元组件（文档标注不推荐）。适用于兼容历史页面或简单单行输入。文档：https://jiangwei58.github.io/papayaui/components/field.html
- **input**：标准文本输入组件。适用于名称、编码、手机号等单行输入。文档：https://jiangwei58.github.io/papayaui/components/input.html
- **textarea**：多行文本输入组件。适用于备注、描述、反馈内容。文档：https://jiangwei58.github.io/papayaui/components/textarea.html
- **input-number**：数值输入组件。适用于数量、价格、权重等数值录入。文档：https://jiangwei58.github.io/papayaui/components/input-number.html
- **search**：搜索输入组件，内置搜索交互语义。适用于列表筛选、关键词检索。文档：https://jiangwei58.github.io/papayaui/components/search.html
- **slider**：滑块输入组件，用于连续区间值调节。适用于进度、百分比、区间筛选。文档：https://jiangwei58.github.io/papayaui/components/slider.html
- **switch**：开关组件，用于布尔状态切换。适用于启用/禁用、开/关类配置项。文档：https://jiangwei58.github.io/papayaui/components/switch.html
- **checkbox**：复选框组件，用于多选输入。适用于多条件筛选、多项授权选择。文档：https://jiangwei58.github.io/papayaui/components/checkbox.html
- **checkbox-btns**：按钮化多选组件，强调选择态可视化。适用于标签筛选、快捷多选。文档：https://jiangwei58.github.io/papayaui/components/checkbox-btns.html
- **radio**：单选框组件，用于互斥项选择。适用于支付方式、任务类型等单选场景。文档：https://jiangwei58.github.io/papayaui/components/radio.html
- **cascader**：级联选择组件，用于多级层级数据选择。适用于省市区、组织层级、类目选择。文档：https://jiangwei58.github.io/papayaui/components/cascader.html
- **calendar**：日历组件，用于日期区间或日期点选择。适用于任务时间、排班、统计日期筛选。文档：https://jiangwei58.github.io/papayaui/components/calendar.html
- **date-picker**：日期时间选择组件。适用于精确到日期或时间的字段录入。文档：https://jiangwei58.github.io/papayaui/components/date-picker.html
- **picker-view**：滚轮选择视图组件。适用于固定选项集的滚轮选择交互。文档：https://jiangwei58.github.io/papayaui/components/picker-view.html
- **picker-popup**：弹窗选择组件，组合弹层与选择逻辑。适用于字典项、枚举项、异步分页选择。文档：https://jiangwei58.github.io/papayaui/components/picker-popup.html
- **uploader**：上传组件，用于图片/文件上传管理。适用于拍照上传、附件提交、凭证收集。文档：https://jiangwei58.github.io/papayaui/components/uploader.html

## 导航与信息组织

- **nav-bar**：顶部导航栏组件。适用于自定义标题、返回逻辑、右侧操作入口。文档：https://jiangwei58.github.io/papayaui/components/nav-bar.html
- **tabs**：标签页组件，用于同层内容分区切换。适用于“全部/处理中/已完成”等分类页签。文档：https://jiangwei58.github.io/papayaui/components/tabs.html
- **tabbar**：底部标签栏组件，用于主模块切换。适用于应用一级导航入口。文档：https://jiangwei58.github.io/papayaui/components/tabbar.html
- **sidebar**：侧边导航组件，用于左侧目录切换。适用于分类列表、配置项分区。文档：https://jiangwei58.github.io/papayaui/components/sidebar.html
- **index-bar**：索引栏组件，用于按字母或索引快速定位。适用于通讯录、品牌索引列表。文档：https://jiangwei58.github.io/papayaui/components/index-bar.html
- **segmented**：分段控制器组件，用于轻量级分组切换。适用于图表维度切换、列表视图切换。文档：https://jiangwei58.github.io/papayaui/components/segmented.html
- **steps**：步骤条组件，用于流程阶段展示。适用于审批流、任务流程节点显示。文档：https://jiangwei58.github.io/papayaui/components/steps.html
- **sort-label**：排序标签组件，用于升降序切换与排序字段展示。适用于列表头排序、筛选栏排序条件。文档：https://jiangwei58.github.io/papayaui/components/sort-label.html

## 反馈与弹层交互

- **popup**：通用弹出层组件。适用于轻量弹窗、底部弹层、局部交互浮层。文档：https://jiangwei58.github.io/papayaui/components/popup.html
- **bottom-popup**：底部弹出层组件。适用于动作面板、选择器承载、确认面板。文档：https://jiangwei58.github.io/papayaui/components/bottom-popup.html
- **dialog**：对话框组件，用于确认、警告、二次确认。适用于删除确认、风险提示。文档：https://jiangwei58.github.io/papayaui/components/dialog.html
- **overlay**：遮罩层组件。适用于弹层背景遮挡、点击关闭控制。文档：https://jiangwei58.github.io/papayaui/components/overlay.html
- **menu**：菜单组件，用于选项列表快速操作。适用于下拉菜单、动作菜单。文档：https://jiangwei58.github.io/papayaui/components/menu.html
- **notice-bar**：通知栏组件，用于滚动或固定通知提示。适用于公告、系统提醒、活动提示。文档：https://jiangwei58.github.io/papayaui/components/notice-bar.html
- **popover**：气泡弹出组件，用于锚点附近浮层提示。适用于按钮旁的快捷操作和说明。文档：https://jiangwei58.github.io/papayaui/components/popover.html
- **tooltip**：悬浮提示组件，用于短文本说明。适用于图标解释、字段说明。文档：https://jiangwei58.github.io/papayaui/components/tooltip.html
- **swipe-cell**：滑动单元格组件，用于左右滑动显示操作按钮。适用于消息删除、任务快捷操作。文档：https://jiangwei58.github.io/papayaui/components/swipe-cell.html

## Hooks 与业务能力

- **useList**：分页列表 Hook，统一 `list`、`pageNumber`、`loadStatus` 等状态管理。适用于触底分页、筛选重置、空态展示等高频列表场景。文档：https://jiangwei58.github.io/papayaui/components/useList.html
