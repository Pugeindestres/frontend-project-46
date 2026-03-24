const isObject = value => value !== null && typeof value === 'object'

const formatValue = value => {
  if (isObject(value)) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const buildPath = (path, key) => (path ? `${path}.${key}` : key)

const formatPlain = (diff, parentPath = '') => {
  const lines = diff
    .filter((node) => node.type !== 'unchanged')
    .map((node) => {
      const path = buildPath(parentPath, node.key);

      switch (node.type) {
        case 'added':
          return `Property '${path}' was added with value: ${formatValue(node.value)}`;
        case 'removed':
          return `Property '${path}' was removed`;
        case 'changed':
          return `Property '${path}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
        case 'nested':
          return formatPlain(node.children, path);
        default:
          return '';
      }
    });

  return lines.join('\n');
};

export default formatPlain
