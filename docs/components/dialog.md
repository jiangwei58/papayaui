# Dialog

<!--codes start-->

## 提示弹窗

```html [template]

<pa-cell title="提示弹窗" is-link @click="onOpen()" />

<pa-dialog
  v-model:show="visible"
  title="提示"
  message="落霞与孤鹜齐飞，秋水共长天一色"
></pa-dialog>

```
```ts [script]

import { ref } from 'vue'

const visible = ref(false)

const onOpen = () => {
  visible.value = true
}

```
## 提示弹窗（无标题）

```html [template]

<pa-cell title="提示弹窗（无标题）" is-link @click="onOpen()" />

<pa-dialog v-model:show="visible" message="落霞与孤鹜齐飞，秋水共长天一色"></pa-dialog>

```
```ts [script]

import { ref } from 'vue'

const visible = ref(false)

const onOpen = () => {
  visible.value = true
}

```
## 确认弹窗

```html [template]

<pa-cell title="确认弹窗" is-link @click="onOpen()" />

<pa-dialog
  v-model:show="visible"
  title="提示"
  message="落霞与孤鹜齐飞，秋水共长天一色"
  show-cancel-button
></pa-dialog>

```
```ts [script]

import { ref } from 'vue'

const visible = ref(false)

const onOpen = () => {
  visible.value = true
}

```
## 圆角按钮样式

```html [template]

<pa-cell-group inset>
  <pa-cell title="提示弹窗" is-link @click="onOpen({ title: '提示' })" />
  <pa-cell title="提示弹窗（无标题）" is-link @click="onOpen()" />
  <pa-cell
    title="确认弹窗"
    is-link
    @click="
      onOpen({
        title: '标题',
        showCancelButton: true,
      })
    "
  />
</pa-cell-group>

<pa-dialog
  v-model:show="visible"
  theme="round-button"
  message="落霞与孤鹜齐飞，秋水共长天一色"
  v-bind="dialogProps"
></pa-dialog>

```
```ts [script]

import { ref } from 'vue'
import type { DialogProps } from 'papayaui'

const visible = ref(false)
const dialogProps = ref<Partial<DialogProps>>({})

const onOpen = (props: Partial<DialogProps> = {}) => {
  dialogProps.value = props
  visible.value = true
}

```
## 异步关闭

```html [template]

<pa-cell-group inset>
  <pa-cell title="异步关闭" is-link @click="onOpen()" />
</pa-cell-group>

<pa-dialog
  v-model:show="visible"
  title="提示"
  message="落霞与孤鹜齐飞，秋水共长天一色"
  show-cancel-button
  :close-on-click-overlay="false"
  :before-close="onBeforeClose"
/>

```
```ts [script]

import { ref } from 'vue'
import type { ActionType } from 'papayaui'

const visible = ref(false)

const onOpen = () => {
  visible.value = true
}

const onBeforeClose = (action: ActionType) => {
  if (action === 'confirm') {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 1000)
    })
  } else {
    return true
  }
}

```
## 自定义内容

```html [template]

<pa-cell title="自定义内容" is-link @click="onOpen()" />

<pa-dialog v-model:show="visible" title="标题">
  <view class="flex flex-col items-center justify-center pt-20 pb-50">
    <view class="text-28 color-black-2">这是自定义内容</view>
    <image src="../../../images/demo.jpeg" style="width: 80px; height: 80px" />
  </view>
</pa-dialog>

```
```ts [script]

import { ref } from 'vue'

const visible = ref(false)

const onOpen = () => {
  visible.value = true
}

```
## 自定义底部

```html [template]

<pa-cell title="自定义底部" is-link @click="onOpen()" />

<pa-dialog
  v-model:show="visible"
  title="标题"
  message="可以自定义底部，比如自定按钮，方便利用微信开放能力"
>
  <view class="flex flex-col items-center justify-center pt-20 pb-50 px-48">
    <view class="text-28 color-black-2">可以自定义底部，比如自定按钮，方便利用微信开放能力</view>
    <image v-if="avatarUrl" :src="avatarUrl" style="width: 80px; height: 80px" />
  </view>
  <template #footer>
    <view class="flex items-center justify-between pt-16 px-48 pb-32">
      <pa-button class="width-full block mr-32" type="default" block @click="onOpen(false)">
        取消
      </pa-button>
      <pa-button
        class="width-full block"
        block
        open-type="chooseAvatar"
        @chooseavatar="onChooseAvatar"
      >
        获取头像
      </pa-button>
    </view>
  </template>
</pa-dialog>

```
```ts [script]

import { ref } from 'vue'
import type { EventDetail } from 'papayaui'

const visible = ref(false)
const avatarUrl = ref<string>()

const onOpen = (show = true) => {
  visible.value = show
}

const onChooseAvatar = (e: EventDetail<{ avatarUrl: string }>) => {
  if (e.detail.avatarUrl) {
    avatarUrl.value = e.detail.avatarUrl
  }
}

```

<!--codes end-->

## Dialog Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |
| show | 是否显示弹窗 | boolean | - |
| zIndex | z-index层级 | number |  999 |
| duration | 动画的执行时间，单位ms | string \| number |  300 |
| overlay | 是否显示遮罩 | boolean |  true |
| closeOnClickOverlay | 点击遮罩是否关闭弹窗 | boolean |  true |
| overlayStyle | 自定义遮罩层样式 | CSSProperties | - |
| title | 标题 | string | - |
| width | 弹窗宽度，默认单位为px | string \| number |  320 |
| message | 文本内容，支持通过\n换行 | string | - |
| messageAlign | 内容对齐方式，可选值为left right | 'left'\|'center'\|'right' | - |
| theme | 样式风格 | 'default'\|'round-button' |  'default' |
| showConfirmButton | 是否显示确认按钮 | boolean |  true |
| showCancelButton | 是否显示取消按钮 | boolean | - |
| confirmButtonText | 确认按钮的文本 | string |  '确认' |
| cancelButtonText | 取消按钮的文本 | string |  '取消' |
| beforeClose | 关闭前的回调函数，返回 false 可阻止关闭，支持返回 Promise | (action:ActionType)=\>boolean\|Promise\<boolean\> | - |

<!--props end-->

## Dialog Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |
| confirm | ()  |
| cancel | ()  |
| update:show | (value: PopupProps['show'])  |
| open | ()  |
| opened | ()  |
| close | ()  |
| closed | ()  |
| clickOverlay | ()  |

<!--event end-->

## Dialog Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |
| default | - |
| footer | - |

<!--slot end-->

## 样式变量

<!--cssVar start-->

| 名称 | 默认值 |
| --- | --- |
| --pa-dialog-radius | 16px |
| --pa-dialog-button-height | 48px |
| --pa-dialog-font-size | 16px |
| --pa-dialog-message-padding | 26px 24px |
| --pa-dialog-header-font-weight | 500 |
| --pa-dialog-header-line-height | 24px |
| --pa-dialog-header-padding-top | 26px |
| --pa-dialog-message-font-size | 14px |
| --pa-dialog-message-line-height | 20px |
| --pa-dialog-message-max-height | 60vh |
| --pa-dialog-round-button-height | 36px |

<!--cssVar end-->

