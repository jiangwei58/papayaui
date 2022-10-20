type InterceptorItem<T> = {
  resolve: T
  reject: (reason?: any) => void
}

class RequestInterceptor<T = () => void> {
  list: InterceptorItem<T>[] = []

  use(resolve: InterceptorItem<T>['resolve'], reject?: InterceptorItem<T>['reject']) {
    this.list.push({ resolve, reject: reject || (() => {}) })
  }

  each(iterator: (item: InterceptorItem<T>) => void) {
    this.list.forEach((listItem) => {
      iterator(listItem)
    })
  }
}

export default RequestInterceptor
