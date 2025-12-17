import { program } from 'commander';
import genDiff from './index.js';

const runCLI = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0', '-V, --version', 'output the version number')
    .option('-f, --format [type]', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      const options = program.opts();
      const diff = genDiff(filepath1, filepath2, options.format);
      console.log(diff);
    });

  try {
    program.parse(process.argv);
  } catch (error) {
    console.error(error.message);
    program.outputHelp();
    process.exit(1);
  }

  if (process.argv.length <= 2) {
    program.outputHelp();
  }
};

export default runCLI;