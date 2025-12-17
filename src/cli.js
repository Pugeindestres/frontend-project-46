// src/cli.js
import { program } from 'commander';
import genDiff from './index.js';

const setupCLI = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0', '-V, --version', 'output the version number')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      const diff = genDiff(filepath1, filepath2);
      console.log(diff);
    });

  return program;
};

export default setupCLI;
