const isObject = value => value !== null && typeof value === 'object'

const formatValue = (value, depth) => {
  if (!isObject(value)) {
    return String(value)
  }

  const indent = ' '.repeat(depth * 4)
  const lines = Object.entries(value).map(([k, v]) => {
    const formattedValue = isObject(v) ? formatValue(v, depth + 1) : String(v)
    return `${indent}    ${k}: ${formattedValue}`
  })

  return `{\n${lines.join('\n')}\n${indent}}`
}

const formatStylish = (diff, depth = 0) => {
  const indent = ' '.repeat(depth * 4)
  const lines = diff.map(node => {
    switch (node.type) {
    case 'added':
      return `${indent}  + ${node.key}: ${formatValue(node.value, depth + 1)}`
    case 'removed':
      return `${indent}  - ${node.key}: ${formatValue(node.value, depth + 1)}`
    case 'changed':
      return [
        `${indent}  - ${node.key}: ${formatValue(node.oldValue, depth + 1)}`,
        `${indent}  + ${node.key}: ${formatValue(node.newValue, depth + 1)}`,
      ].join('\n')
    case 'nested':
      return `${indent}    ${node.key}: ${formatStylish(node.children, depth + 1)}`
    case 'unchanged':
      return `${indent}    ${node.key}: ${formatValue(node.value, depth + 1)}`
    default:
      return ''
    }
  })

  return `{\n${lines.join('\n')}\n${indent}}`
}

export default formatStylish
