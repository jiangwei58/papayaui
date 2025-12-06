import type { ValidateMessages } from 'async-validator'

export const MESSAGES_TEMPLATE = {
  required: '{{label}}是必填的',
  stringLen: '{{label}}的长度必须为{{length}}',
  stringMin: '{{label}}的长度不能低于{{length}}',
  stringMax: '{{label}}的长度不能超过{{length}}',
  stringRange: '{{label}}的长度应该为{{min}}~{{max}}',
  numberLen: '{{label}}的值必须为{{length}}',
  numberMin: '{{label}}不能小于{{length}}',
  numberMax: '{{label}}不能大于{{length}}',
  numberRange: '{{label}}必须大于{{min}}且小于{{max}}',
  pattern: '{{label}}格式不正确',
}

export const replaceMessage = (
  message: string,
  data: Record<string, string | number | undefined> = {},
) => {
  // const values = message.match(/(?<=\{\{).+?(?=\}\})/g) // safari不支持
  const values = message.match(/\{\{.+?\}\}/g)
  values?.forEach((val) => {
    const keyVal = data[val.replace(/[{}]/g, '')]
    if (typeof keyVal !== 'undefined') {
      message = message.replace(val, keyVal.toString())
    }
  })
  return message
}

export const validateMessages: ValidateMessages = {
  required: MESSAGES_TEMPLATE.required,
  string: {
    len: (_key, length) =>
      replaceMessage(MESSAGES_TEMPLATE.stringLen, {
        length,
      }),
    min: (_key, min) =>
      replaceMessage(MESSAGES_TEMPLATE.stringMin, {
        length: min,
      }),
    max: (_key, max) =>
      replaceMessage(MESSAGES_TEMPLATE.stringMax, {
        length: max,
      }),
    range: (_key, min, max) =>
      replaceMessage(MESSAGES_TEMPLATE.stringMax, {
        min,
        max,
      }),
  },
  number: {
    len: (_key, length) =>
      replaceMessage(MESSAGES_TEMPLATE.numberLen, {
        length: length,
      }),
    min: (_key, min) =>
      replaceMessage(MESSAGES_TEMPLATE.numberMin, {
        length: min,
      }),
    max: (_key, max) =>
      replaceMessage(MESSAGES_TEMPLATE.numberMax, {
        length: max,
      }),
    range: (_key, min, max) =>
      replaceMessage(MESSAGES_TEMPLATE.numberRange, {
        min,
        max,
      }),
  },
  pattern: {
    mismatch: MESSAGES_TEMPLATE.pattern,
  },
}
