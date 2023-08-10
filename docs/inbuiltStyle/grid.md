# Grid 布局

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
<view class="grid grid-cols-6 gap-20">
  <view>1</view>
  <view>2</view>
  <view>3</view>
  <view>4</view>
  <view>5</view>
  <view>6</view>
</view>

<view class="grid grid-cols-3 gap-20">
  <view class="col-span-2">1</view>
  <view class="col-start-4">2</view>
  <view>3</view>
</view>
```

<div class="wrapper grid grid-cols-6" style="gap:20px">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>

<br />

<div class="wrapper grid grid-cols-6" style="gap:20px">
  <div class="col-span-2">1</div>
  <div class="col-start-4">2</div>
  <div>3</div>
</div>
:::

| 类名   | 属性          |
| ------ | ------------- |
| `grid` | display: grid |

---

| &nbsp;                   | &nbsp;                                              |
| ------------------------ | --------------------------------------------------- |
| `grid-cols-${x}`（0-12） | grid-template-columns: repeat(${x}, minmax(0, 1fr)) |

---

| &nbsp;                  | &nbsp;                                           |
| ----------------------- | ------------------------------------------------ |
| `grid-rows-${x}`（0-6） | grid-template-rows: repeat(${x}, minmax(0, 1fr)) |

---

| &nbsp;                  | &nbsp;                              |
| ----------------------- | ----------------------------------- |
| `col-span-${x}`（1-12） | grid-column: span ${x} / span ${x}; |
| `col-span-auto`         | grid-column: auto;                  |
| `col-span-full`         | grid-column: 1 / -1;                |
| `row-span-${x}`（1-12） | grid-row: span ${x} / span ${x};    |
| `row-span-auto`         | grid-row: auto;                     |
| `row-span-full`         | grid-row: 1 / -1;                   |

---

| &nbsp;                   | &nbsp;                   |
| ------------------------ | ------------------------ |
| `col-start-${x}`（0-13） | grid-column-start: ${x}; |
| `row-start-${x}`（0-13） | grid-row-start: ${x};    |

---

| &nbsp;                 | &nbsp;                 |
| ---------------------- | ---------------------- |
| `col-end-${x}`（0-13） | grid-column-end: ${x}; |
| `row-end-${x}`（0-13） | grid-row-end: ${x};    |

---

| &nbsp;               | &nbsp;            |
| -------------------- | ----------------- |
| `gap-${x}`（0-30）   | gap: ${x};        |
| `gap-x-${x}`（0-30） | column-gap: ${x}; |
| `gap-y-${x}`（0-30） | row-gap: ${x};    |
