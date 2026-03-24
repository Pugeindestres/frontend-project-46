import { describe, expect, test } from '@jest/globals'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import genDiff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)
const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

describe('gendiff', () => {
  const expectedStylish = readFile('expected_nested.txt')
  const expectedPlain = readFile('expected_plain.txt')
  const expectedJson = readFile('expected_json.txt')

  test('should compare nested JSON files with stylish format', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')

    const result = genDiff(file1, file2, 'stylish')
    expect(result).toBe(expectedStylish)
  })

  test('should compare nested YAML files with stylish format', () => {
    const file1 = getFixturePath('file1.yml')
    const file2 = getFixturePath('file2.yml')

    const result = genDiff(file1, file2, 'stylish')
    expect(result).toBe(expectedStylish)
  })

  test('should compare with plain format', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')

    const result = genDiff(file1, file2, 'plain')
    expect(result).toBe(expectedPlain)
  })

  test('should compare with json format', () => {
    const file1 = getFixturePath('file1.json')
    const file2 = getFixturePath('file2.json')

    const result = genDiff(file1, file2, 'json')
    expect(result).toBe(expectedJson)
  })
})
