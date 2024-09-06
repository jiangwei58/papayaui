import type { ComponentInternalInstance } from 'vue'

function useRect(
  component: ComponentInternalInstance,
  selector: string,
  all?: false,
): Promise<Required<UniApp.NodeInfo> | null>
function useRect(
  component: ComponentInternalInstance,
  selector: string,
  all: true,
): Promise<Required<UniApp.NodeInfo>[]>
function useRect(
  component: ComponentInternalInstance,
  selector: string,
  all?: boolean,
): Promise<(Required<UniApp.NodeInfo> | null) | Required<UniApp.NodeInfo>[]> {
  return new Promise((resolve) => {
    // #ifndef H5
    uni
      .createSelectorQuery()
      .in(component)
      [all ? 'selectAll' : 'select'](selector)
      .boundingClientRect((rect) => {
        if (all) {
          resolve(rect as Required<UniApp.NodeInfo>[])
        } else {
          resolve(rect as Required<UniApp.NodeInfo>)
        }
      })
      .exec()
    // #endif
    // #ifdef H5
    let el: HTMLElement = component.proxy?.$el
    el = el.parentElement ?? el
    if (all) {
      resolve(
        Array.from(el.querySelectorAll(selector)).map((item) =>
          item.getBoundingClientRect(),
        ) as unknown as Required<UniApp.NodeInfo>[],
      )
    } else {
      resolve(
        el.querySelector(selector)?.getBoundingClientRect() as unknown as Required<UniApp.NodeInfo>,
      )
    }
    // #endif
  })
}

export default useRect
