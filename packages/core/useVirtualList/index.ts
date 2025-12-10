import type { EventDetail } from '@papayaui/types'
import type { ComputedRef, CSSProperties, Ref, ShallowRef } from 'vue'
import { computed, isRef, MaybeRef, ref, shallowRef, watch } from 'vue'

type UseVirtualElementSizes = {
  /**
   * 滚动容器的宽度
   * @default 0
   */
  width: number
  /**
   * 滚动容器的高度
   * @default 0
   */
  height: number
}

type UseVirtualListItemSize = number | ((index: number) => number)

export interface UseHorizontalVirtualListOptions extends UseVirtualListOptionsBase {
  /**
   * 每项的宽度，接收像素值或者函数返回宽度
   * @default 0
   */
  itemWidth: UseVirtualListItemSize
}

export interface UseVerticalVirtualListOptions extends UseVirtualListOptionsBase {
  /**
   * 每项的高度，接收像素值或者函数返回高度
   * @default 0
   */
  itemHeight: UseVirtualListItemSize
}

export interface UseVirtualListOptionsBase {
  /**
   * 滚动容器的尺寸
   */
  containerSize: MaybeRef<UseVirtualElementSizes>
  /**
   * 视图区域之外的额外缓冲区项
   * @description 可以提升滑动时的性能，但是会增加滚动容器的滚动高度，增加元素数量会增加渲染消耗
   * @default 5
   */
  overscan?: number
}

export type UseVirtualListOptions = UseHorizontalVirtualListOptions | UseVerticalVirtualListOptions

export interface UseVirtualListItem<T> {
  data: T
  index: number
}

export interface UseVirtualListReturn<T> {
  list: Ref<UseVirtualListItem<T>[]>
  getDistance: (index: number) => void

  containerProps: {
    onScroll: (e: EventDetail<{ scrollTop: number; scrollLeft: number }>) => void
    style: CSSProperties
  }
  wrapperProps: ComputedRef<{
    style:
      | {
          width: string
          height: string
          marginTop: string
        }
      | {
          width: string
          height: string
          marginLeft: string
          display: string
        }
  }>
}

/**
 * 虚拟列表
 */
export function useVirtualList<T = any>(
  list: MaybeRef<T[]>,
  options: UseVirtualListOptions,
): UseVirtualListReturn<T> {
  const { containerStyle, wrapperProps, getDistance, calculateRange, currentList } =
    'itemHeight' in options
      ? useVerticalVirtualList(options, list)
      : useHorizontalVirtualList(options, list)

  return {
    list: currentList,
    getDistance,
    containerProps: {
      onScroll: (e) => {
        calculateRange(e)
      },
      style: containerStyle,
    },
    wrapperProps,
  }
}

type UseVirtualListArray<T> = UseVirtualListItem<T>[]
type UseVirtualListRefArray<T> = Ref<UseVirtualListArray<T>>

type UseVirtualListSource<T> = Ref<T[]> | ShallowRef<T[]>

interface UseVirtualListState {
  start: number
  end: number
}

type RefState = Ref<UseVirtualListState>

interface UseVirtualListResources<T> {
  state: RefState
  source: UseVirtualListSource<T>
  currentList: UseVirtualListRefArray<T>
  size: Ref<UseVirtualElementSizes>
}

function useVirtualListResources<T>(
  list: MaybeRef<T[]>,
  options: UseVirtualListOptions,
): UseVirtualListResources<T> {
  const size = isRef(options.containerSize) ? options.containerSize : ref(options.containerSize)

  const currentList: Ref<UseVirtualListItem<T>[]> = ref([])
  const source = shallowRef(list)

  const state: Ref<{ start: number; end: number }> = ref({ start: 0, end: 10 })

  return { state, source, currentList, size }
}

function createGetViewCapacity<T>(
  state: UseVirtualListResources<T>['state'],
  source: UseVirtualListResources<T>['source'],
  itemSize: UseVirtualListItemSize,
) {
  return (containerSize: number) => {
    if (typeof itemSize === 'number') return Math.ceil(containerSize / itemSize)

    const { start = 0 } = state.value
    let sum = 0
    let capacity = 0
    for (let i = start; i < source.value.length; i++) {
      const size = itemSize(i)
      sum += size
      capacity = i
      if (sum > containerSize) break
    }
    return capacity - start
  }
}

function createGetOffset<T>(
  source: UseVirtualListResources<T>['source'],
  itemSize: UseVirtualListItemSize,
) {
  return (scrollDirection: number) => {
    if (typeof itemSize === 'number') return Math.floor(scrollDirection / itemSize) + 1

    let sum = 0
    let offset = 0

    for (let i = 0; i < source.value.length; i++) {
      const size = itemSize(i)
      sum += size
      if (sum >= scrollDirection) {
        offset = i
        break
      }
    }
    return offset + 1
  }
}

function createCalculateRange<T>(
  type: 'horizontal' | 'vertical',
  overscan: number,
  getOffset: ReturnType<typeof createGetOffset>,
  getViewCapacity: ReturnType<typeof createGetViewCapacity>,
  { state, currentList, source, size }: UseVirtualListResources<T>,
) {
  return (event: EventDetail<{ scrollTop: number; scrollLeft: number }>) => {
    if (event) {
      const offset = getOffset(
        type === 'vertical' ? event.detail.scrollTop : event.detail.scrollLeft,
      )
      const viewCapacity = getViewCapacity(
        type === 'vertical' ? size.value.height : size.value.width,
      )

      const from = offset - overscan
      const to = offset + viewCapacity + overscan
      state.value = {
        start: from < 0 ? 0 : from,
        end: to > source.value.length ? source.value.length : to,
      }
      currentList.value = source.value
        .slice(state.value.start, state.value.end)
        .map((ele, index) => ({
          data: ele,
          index: index + state.value.start,
        }))
    }
  }
}

function createGetDistance<T>(
  itemSize: UseVirtualListItemSize,
  source: UseVirtualListResources<T>['source'],
) {
  return (index: number) => {
    if (typeof itemSize === 'number') {
      const size = index * itemSize
      return size
    }

    const size = source.value.slice(0, index).reduce((sum, _, i) => sum + itemSize(i), 0)

    return size
  }
}

function useWatchForSizes<T>(
  size: Ref<UseVirtualElementSizes>,
  list: MaybeRef<T[]>,
  calculateRange: (e: EventDetail<{ scrollTop: number; scrollLeft: number }>) => void,
) {
  watch([size, list], () => {
    calculateRange({ detail: { scrollTop: 0, scrollLeft: 0 } })
  })
}

function createComputedTotalSize<T>(
  itemSize: UseVirtualListItemSize,
  source: UseVirtualListResources<T>['source'],
) {
  return computed(() => {
    if (typeof itemSize === 'number') return source.value.length * itemSize

    return source.value.reduce((sum, _, index) => sum + itemSize(index), 0)
  })
}

function useHorizontalVirtualList<T>(
  options: UseHorizontalVirtualListOptions,
  list: MaybeRef<T[]>,
) {
  const resources = useVirtualListResources(list, options)
  const { state, source, currentList, size } = resources
  const containerStyle: CSSProperties = { overflowX: 'hidden' }

  const { itemWidth, overscan = 5 } = options

  const getViewCapacity = createGetViewCapacity(state, source, itemWidth)

  const getOffset = createGetOffset(source, itemWidth)

  const calculateRange = createCalculateRange(
    'horizontal',
    overscan,
    getOffset,
    getViewCapacity,
    resources,
  )

  const getDistanceLeft = createGetDistance(itemWidth, source)

  const offsetLeft = computed(() => getDistanceLeft(state.value.start))

  const totalWidth = createComputedTotalSize(itemWidth, source)

  useWatchForSizes(size, list, calculateRange)

  const wrapperProps = computed(() => {
    return {
      style: {
        height: '100%',
        width: `${totalWidth.value - offsetLeft.value}px`,
        marginLeft: `${offsetLeft.value}px`,
        display: 'flex',
      },
    }
  })

  return {
    calculateRange,
    getDistance: getDistanceLeft,
    wrapperProps,
    containerStyle,
    currentList,
  }
}

function useVerticalVirtualList<T>(options: UseVerticalVirtualListOptions, list: MaybeRef<T[]>) {
  const resources = useVirtualListResources(list, options)

  const { state, source, currentList, size } = resources

  const containerStyle: CSSProperties = { overflowY: 'hidden' }

  const { itemHeight, overscan = 5 } = options

  const getViewCapacity = createGetViewCapacity(state, source, itemHeight)

  const getOffset = createGetOffset(source, itemHeight)

  const calculateRange = createCalculateRange(
    'vertical',
    overscan,
    getOffset,
    getViewCapacity,
    resources,
  )

  const getDistanceTop = createGetDistance(itemHeight, source)

  const offsetTop = computed(() => getDistanceTop(state.value.start))

  const totalHeight = createComputedTotalSize(itemHeight, source)

  useWatchForSizes(size, list, calculateRange)

  const wrapperProps = computed(() => {
    return {
      style: {
        width: '100%',
        height: `${totalHeight.value - offsetTop.value}px`,
        marginTop: `${offsetTop.value}px`,
      },
    }
  })

  return {
    calculateRange,
    getDistance: getDistanceTop,
    containerStyle,
    wrapperProps,
    currentList,
  }
}
