import { describe, expect, test } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('gendiff for flat files', () => {
  const expectedOutput = readFile('expected.txt');
  
  test('should compare JSON files', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.json');
    
    const result = genDiff(file1, file2, 'stylish');
    expect(result).toBe(expectedOutput);
  });
  
  test('should compare YAML files', () => {
    const file1 = getFixturePath('file1.yml');
    const file2 = getFixturePath('file2.yml');
    
    const result = genDiff(file1, file2, 'stylish');
    expect(result).toBe(expectedOutput);
  });
  
  test('should compare mixed formats (JSON and YAML)', () => {
    const file1 = getFixturePath('file1.json');
    const file2 = getFixturePath('file2.yml');
    
    const result = genDiff(file1, file2, 'stylish');
    expect(result).toBe(expectedOutput);
  });
});