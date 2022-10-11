import { FormRuleItem, FormRuleMapItem } from './useFormValidate'

/** 表单校验模板 */
const MESSAGE_RULE_OBJ = {
  inputRequired: '请输入%s',
  selectRequired: '请选择%s',
  max: '%s仅可输入%l个以内的字符',
  maxLength: '%s的长度不能超过%l',
  pattern: '%s格式不正确',
}

/**
 * 表单规则数据生成
 * @description 在常规表单规则基础上封装，生成一套统一规则的表单名称、输入提示、错误提示等。
 * 支持动态标识替换：{{字段名}}
 */
export const getRuleMessage = (
  type: keyof typeof MESSAGE_RULE_OBJ,
  text: string,
  extra?: Record<string, string>,
) => {
  let message = MESSAGE_RULE_OBJ[type].replace('%s', text)
  if (extra) {
    for (const key in extra) {
      message = message.replace(`%${key}`, extra[key])
    }
  }
  return message
}

const replaceMessage = (message: string, item: FormRuleMapItem) => {
  const values = message.match(/(?<=\{\{).+?(?=\}\})/g)
  values?.forEach((val) => {
    message = message.replace(
      `{{${val}}}`,
      {
        ...item,
        rules: undefined,
      }[val as keyof FormRuleMapItem] as string,
    )
  })
  return message
}

const generateMessage = (
  item: FormRuleItem,
  text: string,
  type: FormRuleMapItem['type'] = 'input',
): string => {
  if (typeof item.required !== 'undefined') {
    return getRuleMessage(type === 'input' ? 'inputRequired' : 'selectRequired', text)
  }
  if (typeof item.max !== 'undefined') {
    return getRuleMessage('max', text, { l: item.max.toString() })
  }
  if (typeof item.maxLength !== 'undefined') {
    return getRuleMessage('maxLength', text, { l: item.maxLength.toString() })
  }
  if (typeof item.pattern !== 'undefined') {
    return getRuleMessage('pattern', text)
  }
  return '校验错误'
}

export const getDefaultMessage = (rule: FormRuleItem, rulesMapItem: FormRuleMapItem): string => {
  if (rule.message && typeof rule.message === 'string') {
    // 有message时识别变量替换值
    return replaceMessage(rule.message, rulesMapItem)
  } else {
    // 无message根据规则生成默认值
    return generateMessage(rule, rulesMapItem.label || '', rulesMapItem.type)
  }
}
