import type { Plugin, App, ComponentInternalInstance } from 'vue'
import { defaultNamespace } from '@papayaui/core'

export interface GlobalOptions {
  cell?: { selectable?: boolean } | undefined
}

export const GLOBAL_OPTION_KEY = `$${defaultNamespace}Options`

export const initGlobalOptions = (app: App, options?: GlobalOptions) => {
  app.config.globalProperties[`$${defaultNamespace}Options`] = {
    cell: {
      selectable: options?.cell?.selectable,
    },
  }
}

export const getGlobalOptions = (instance: ComponentInternalInstance | null) => {
  return instance?.appContext.config.globalProperties[GLOBAL_OPTION_KEY]
}

export const installer: Plugin = (app, options?: GlobalOptions) => {
  initGlobalOptions(app, options)
}
