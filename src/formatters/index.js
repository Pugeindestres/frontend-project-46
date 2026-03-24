import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const formatters = {
  stylish,
  plain,
  json,
}

export default formatName => {
  if (!formatters[formatName]) {
    throw new Error(`Unknown format: ${formatName}. Supported formats: stylish, plain, json`)
  }
  return formatters[formatName]
}
