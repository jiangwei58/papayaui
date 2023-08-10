# Flex 布局

<style lang="scss" scoped>
.wrapper > div {
  width: 100%;
  min-height: 26px;
  color: #fff;
  background-color: var(--pa-color-primary);
  border-radius: 5px;
}
</style>

::: info 示例

```html
<view class="flex">
  <view></view>
  <view></view>
</view>
```
<div class="wrapper flex">
  <div></div>
  <div></div>
</div>

:::

::: info 示例

```html
<view class="flex flex-col">
  <view></view>
  <view></view>
</view>
```

<div class="wrapper flex flex-col">
  <div></div>
  <div></div>
</div>

:::

::: info 示例

```html
<view class="flex items-center">
  <view></view>
  <view></view>
</view>
```

<div class="wrapper flex items-center">
  <div></div>
  <div style="height:50px"></div>
</div>

:::

::: info 示例

```html
<view class="flex items-center justify-between">
  <view></view>
  <view></view>
</view>
```

<div class="wrapper flex items-center justify-between">
  <div style="width:120px;"></div>
  <div style="width:120px;height:50px"></div>
</div>

:::

| 类名          | 属性                 |
| ------------- | -------------------- |
| `flex`        | display: flex        |
| `inline-flex` | display: inline-flex |

---

| &nbsp;             | &nbsp;                         |
| ------------------ | ------------------------------ |
| `flex-row`         | flex-direction: row            |
| `flex-row-reverse` | flex-direction: row-reverse    |
| `flex-col`         | flex-direction: column         |
| `flex-col-reverse` | flex-direction: column-reverse |

---

| &nbsp;              | &nbsp;                  |
| ------------------- | ----------------------- |
| `flex-wrap`         | flex-wrap: wrap         |
| `flex-wrap-reverse` | flex-wrap: wrap-reverse |
| `flex-nowrap`       | flex-wrap: nowrap       |

---

| &nbsp;          | &nbsp;         |
| --------------- | -------------- |
| `flex-shrink-0` | flex-shrink: 0 |

---

| &nbsp;            | &nbsp;                         |
| ----------------- | ------------------------------ |
| `justify-start`   | justify-content: flex-start    |
| `justify-end`     | justify-content: flex-end      |
| `justify-center`  | justify-content: center        |
| `justify-between` | justify-content: space-between |
| `justify-around`  | justify-content: space-around  |
| `justify-evenly`  | justify-content: space-evenly  |

---

| &nbsp;           | &nbsp;                  |
| ---------------- | ----------------------- |
| `items-start`    | align-items: flex-start |
| `items-end`      | align-items: flex-end   |
| `items-center`   | align-items: center     |
| `items-baseline` | align-items: baseline   |
| `items-stretch`  | align-items: stretch    |

---

| &nbsp;                  | &nbsp;                 |
| ----------------------- | ---------------------- |
| `justify-self-auto`     | justify-self: auto     |
| `justify-self-start`    | justify-self: start    |
| `justify-self-end`      | justify-self: end      |
| `justify-self-center`   | justify-self: center   |
| `justify-self-baseline` | justify-self: baseline |
| `justify-self-stretch`  | justify-self: stretch  |

---

| &nbsp;            | &nbsp;                       |
| ----------------- | ---------------------------- |
| `content-start`   | align-content: flex-start    |
| `content-end`     | align-content: flex-end      |
| `content-center`  | align-content: center        |
| `content-between` | align-content: space-between |
| `content-around`  | align-content: space-around  |
| `content-evenly`  | align-content: space-evenly  |

---

| &nbsp;          | &nbsp;                 |
| --------------- | ---------------------- |
| `self-auto`     | align-self: auto       |
| `self-start`    | align-self: flex-start |
| `self-end`      | align-self: flex-end   |
| `self-center`   | align-self: center     |
| `self-baseline` | align-self: baseline   |
| `self-stretch`  | align-self: stretch    |