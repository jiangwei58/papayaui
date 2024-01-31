# 工具函数

## 类型判断

```ts
// 是否为函数
isFunction(() => {}) // true

// 是否为对象
isObject({}) // true
isObject(null) // false

// 是否为日期
isDate(new Date()) // true
isDate(1704038399000) // false
isDate('2023-12-31 23:59:59') // false

// 是否为undefined
isUndefined(undefined) // true
isUndefined('undefined') // false

// 是否为数值
isNumber(1) // true

// 是否为Promise
isPromise(new Promise(() => {})) // true

// 是否为字符串
isString('') // true

// 是否为布尔值
isBoolean(true) // true

// 是否为数组
isArray([]) // true

// 是否为普通对象
isPlainObject({}) // true
isPlainObject([]) // false
isPlainObject(() => {}) // false
```

## 防抖节流

::: info 防抖

```ts
debounce(() => {}, 1000)
```

| 参数 | 说明     | 类型                    | 默认值 |
| ---- | -------- | ----------------------- | ------ |
| fn   | 回调函数 | (...args: any[]) => any | -      |
| wait | 等待时间 | number                  | 300    |

:::

::: info 节流

```ts
throttle(() => {}, 1000)

throttle(() => {}, 1000, { leading: true })

throttle(() => {}, 1000, { trailing: true })

throttle(() => {}, 1000, { leading: true, trailing: true })
```

| 参数     | 说明                     | 类型                    | 默认值 |
| -------- | ------------------------ | ----------------------- | ------ |
| fn       | 回调函数                 | (...args: any[]) => any | -      |
| wait     | 等待时间                 | number                  | 300    |
| leading  | 等待前执行，即立即执行   | boolean                 | false  |
| trailing | 等待后执行，即超时后执行 | boolean                 | false  |

:::

## 对象操作

```ts
// 创建由所选对象属性组成的对象
pick({ a: 1, b: 2 }, ['a']) // { a: 1 }

// 反向版 pick
omit({ a: 1, b: 2 }, ['a']) // { b: 2 }

// 递归合并来源对象自身和继承的可枚举属性到目标对象
merge({ a: 1 }, { b: 2 }) // { a: 1, b: 2 }
merge({ a: 1 }, { b: 2 }, { c: 3 }) // { a: 1, b: 2, c: 3 }
```

## 其他

```ts
// 转换对象为字符串参数值
convertQueryToString({ a: 1, b: 2 }) // a=1&b=2
convertQueryToString({ a: 1, c: [3, 4] }) // a=1&c=3,4

// 判断是否为空
isEmpty(null) // true
isEmpty(undefined) // true
isEmpty('') // true
isEmpty([]) // true
isEmpty({}) // true

// 空函数, 通常用于设置默认值
noop() // undefined
fn(noop) // undefined

// 睡眠，延迟执行
sleep(1000).then(() => {
  console.log('1秒后执行')
})
```