# Loadmore

<!--codes start-->

## 基础用法

```html [template]

<pa-loadmore :status="LoadStatusEnum.LOADMORE" />
<pa-loadmore :status="LoadStatusEnum.LOADING" />
<pa-loadmore :status="LoadStatusEnum.NOMORE" />

```
```ts [script]

import { LoadStatusEnum } from 'papayaui'

```
## 自定义文案

```html [template]

<pa-loadmore :config="customConfig" :status="LoadStatusEnum.LOADMORE" />
<pa-loadmore :config="customConfig" :status="LoadStatusEnum.LOADING" />
<pa-loadmore :config="customConfig" :status="LoadStatusEnum.NOMORE" />

```
```ts [script]

import { LoadStatusEnum } from 'papayaui'

const customConfig = { loadmore: '给我上划', loading: '努力加载...', nomore: '真的没有了' }

```
## 颜色

```html [template]

<pa-loadmore :status="LoadStatusEnum.LOADING" color="red" />
<pa-loadmore :status="LoadStatusEnum.LOADING" text-color="red" />

```
```ts [script]

import { LoadStatusEnum } from 'papayaui'

```

<!--codes end-->

## Loadmore Props

<!--props start-->

| 参数 | 说明 | 类型 | 默认值 |
| --- | ----- | --- | --- |


<!--props end-->

## Loadmore Event

<!--event start-->

| 事件名 | 参数 |
| --- | --- |


<!--event end-->

## Loadmore Slot

<!--slot start-->

| 名称 | 说明 |
| --- | --- |


<!--slot end-->

## 样式变量

<!--cssVar start-->

:see_no_evil:

<!--cssVar end-->

