import { getCurrentInstance } from 'vue'
import useRect from './useRect'

function useRectByCurrentInstance(
  selector: string,
  all?: false,
): Promise<Required<UniApp.NodeInfo> | null>
function useRectByCurrentInstance(selector: string, all: true): Promise<Required<UniApp.NodeInfo>[]>
function useRectByCurrentInstance(
  selector: string,
  all?: boolean,
): Promise<(Required<UniApp.NodeInfo> | null) | Required<UniApp.NodeInfo>[]> {
  const instance = getCurrentInstance()
  if (!instance) return Promise.reject(new Error('未找到组件实例'))
  return all ? useRect(instance, selector, true) : useRect(instance, selector, false)
}

export default useRectByCurrentInstance
