import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

/**
 * Определяет формат файла по расширению
 * @param {string} filepath - путь к файлу
 * @returns {string} - расширение файла (например, 'json', 'yml', 'yaml')
 */
const getFileExtension = (filepath) => path.extname(filepath).slice(1).toLowerCase();

/**
 * Парсит JSON файл
 * @param {string} filepath - путь к файлу
 * @returns {object} - распарсенный JSON объект
 */
const parseJSON = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(data);
};

/**
 * Парсит YAML файл
 * @param {string} filepath - путь к файлу
 * @returns {object} - распарсенный YAML объект
 */
const parseYAML = (filepath) => {
  const data = fs.readFileSync(filepath, 'utf-8');
  return yaml.load(data);
};

/**
 * Парсит файл в зависимости от его расширения
 * @param {string} filepath - путь к файлу
 * @returns {object} - распарсенные данные
 * @throws {Error} - если формат файла не поддерживается
 */
const parseFile = (filepath) => {
  const extension = getFileExtension(filepath);

  switch (extension) {
    case 'json':
      return parseJSON(filepath);
    case 'yml':
    case 'yaml':
      return parseYAML(filepath);
    default:
      throw new Error(`Unsupported file format: ${extension}. Supported formats: JSON, YAML`);
  }
};

export default parseFile;
