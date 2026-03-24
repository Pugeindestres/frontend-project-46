import path from 'path'
import fs from 'fs'
import yaml from 'js-yaml'
import getFormatter from './formatters/index.js'

const parseFile = filepath => {
  const data = fs.readFileSync(filepath, 'utf-8')
  const extension = path.extname(filepath).slice(1).toLowerCase()

  if (extension === 'json') {
    return JSON.parse(data)
  }
  if (extension === 'yml' || extension === 'yaml') {
    return yaml.load(data)
  }
  throw new Error(`Unsupported file format: ${extension}`)
}

const isObject = value => value !== null && typeof value === 'object'

const buildDiff = (obj1, obj2) => {
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)])
  const sortedKeys = Array.from(keys).sort()

  return sortedKeys.map(key => {
    const value1 = obj1[key]
    const value2 = obj2[key]

    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: value2 }
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'removed', value: value1 }
    }
    if (isObject(value1) && isObject(value2)) {
      return { key, type: 'nested', children: buildDiff(value1, value2) }
    }
    if (value1 !== value2) {
      return {
        key, type: 'changed', oldValue: value1, newValue: value2,
      }
    }
    return { key, type: 'unchanged', value: value1 }
  })
}

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1)
  const absolutePath2 = path.resolve(process.cwd(), filepath2)

  const data1 = parseFile(absolutePath1)
  const data2 = parseFile(absolutePath2)

  const diff = buildDiff(data1, data2)
  const format = getFormatter(formatName)

  return format(diff)
}

export default genDiff
