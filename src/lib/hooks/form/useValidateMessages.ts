import { ValidateMessages } from 'async-validator'
import { computed } from 'vue'
import { MESSAGES_TEMPLATE } from './message'

/**
 * 生成对应校验文案
 */
export default (messages: { [key: string]: Record<string, string> | undefined } = {}) => {
  const replaceMessage = (
    message: string,
    data: Record<string, string | number | undefined> = {},
  ) => {
    const values = message.match(/(?<=\{\{).+?(?=\}\})/g)
    values?.forEach((val) => {
      message = message.replace(`{{${val}}}`, (data[val] ?? '').toString())
    })
    return message
  }

  const validateMessages = computed<ValidateMessages>(() => {
    return {
      required: (key) => replaceMessage(MESSAGES_TEMPLATE.required, messages[key as string]),
      string: {
        len: (key, length) =>
          replaceMessage(MESSAGES_TEMPLATE.stringLen, {
            ...messages[key as string],
            length,
          }),
        min: (key, min) =>
          replaceMessage(MESSAGES_TEMPLATE.stringMin, {
            ...messages[key as string],
            length: min,
          }),
        max: (key, max) =>
          replaceMessage(MESSAGES_TEMPLATE.stringMax, {
            ...messages[key as string],
            length: max,
          }),
        range: (key, min, max) =>
          replaceMessage(MESSAGES_TEMPLATE.stringMax, {
            ...messages[key as string],
            min,
            max,
          }),
      },
      number: {
        len: (key, length) =>
          replaceMessage(MESSAGES_TEMPLATE.numberLen, {
            ...messages[key as string],
            length: length,
          }),
        min: (key, min) =>
          replaceMessage(MESSAGES_TEMPLATE.numberMin, {
            ...messages[key as string],
            length: min,
          }),
        max: (key, max) =>
          replaceMessage(MESSAGES_TEMPLATE.numberMax, {
            ...messages[key as string],
            length: max,
          }),
        range: (key, min, max) =>
          replaceMessage(MESSAGES_TEMPLATE.numberRange, {
            ...messages[key as string],
            min,
            max,
          }),
      },
      pattern: {
        mismatch: (key) => replaceMessage(MESSAGES_TEMPLATE.pattern, messages[key as string]),
      },
    }
  })

  return validateMessages
}
