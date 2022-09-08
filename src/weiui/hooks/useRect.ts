import { ComponentInternalInstance } from 'vue'

function useRect(
  component: ComponentInternalInstance,
  selector: string,
  all?: false,
): Promise<Required<UniApp.NodeInfo>>
function useRect(
  component: ComponentInternalInstance,
  selector: string,
  all: true,
): Promise<Required<UniApp.NodeInfo>[]>
function useRect(
  component: ComponentInternalInstance,
  selector: string,
  all?: boolean,
): Promise<Required<UniApp.NodeInfo> | Required<UniApp.NodeInfo>[]> {
  return new Promise((resolve) => {
    uni
      .createSelectorQuery()
      .in(component)
      [all ? 'selectAll' : 'select'](selector)
      .boundingClientRect((rect) => {
        if (all && Array.isArray(rect) && rect.length) {
          resolve(rect)
        }
        if (!all && rect) {
          resolve(rect as Required<UniApp.NodeInfo>)
        }
      })
      .exec()
  })
}

export default useRect
