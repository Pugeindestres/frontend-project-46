import path from 'path';
import parseFile from './parsers.js';

const buildDiff = (obj1, obj2) => {
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
  const sortedKeys = Array.from(keys).sort();
  
  return sortedKeys.map((key) => {
    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'removed', value: obj1[key] };
    }
    if (obj1[key] !== obj2[key]) {
      return { key, type: 'changed', oldValue: obj1[key], newValue: obj2[key] };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });
};

const formatStylish = (diff) => {
  const lines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `  + ${node.key}: ${node.value}`;
      case 'removed':
        return `  - ${node.key}: ${node.value}`;
      case 'changed':
        return `  - ${node.key}: ${node.oldValue}\n  + ${node.key}: ${node.newValue}`;
      case 'unchanged':
        return `    ${node.key}: ${node.value}`;
      default:
        return '';
    }
  });
  
  return `{\n${lines.join('\n')}\n}`;
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const absolutePath1 = path.resolve(process.cwd(), filepath1);
  const absolutePath2 = path.resolve(process.cwd(), filepath2);
  
  const data1 = parseFile(absolutePath1);
  const data2 = parseFile(absolutePath2);
  
  const diff = buildDiff(data1, data2);
  
  if (format === 'stylish') {
    return formatStylish(diff);
  }
  
  return formatStylish(diff);
};

export default genDiff;