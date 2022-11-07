import { ComponentInternalInstance } from 'vue'

function useRect(
  component: ComponentInternalInstance,
  selector: string,
  all: false,
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
  })
}

export default useRect
