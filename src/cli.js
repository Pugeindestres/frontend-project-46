import { program } from 'commander'
import genDiff from './index.js'

const runCLI = () => {
  program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0', '-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      try {
        const options = program.opts()

        const addPrefix = filepath => {
          if (
            filepath.startsWith('/')
            || filepath.startsWith('./')
            || filepath.startsWith('../')
            || filepath.includes('/')
          ) {
            return filepath
          }
          return `__fixtures__/${filepath}`
        }

        const finalPath1 = addPrefix(filepath1)
        const finalPath2 = addPrefix(filepath2)

        const diff = genDiff(finalPath1, finalPath2, options.format)
        console.log(diff)
      }
      catch (error) {
        console.error('Error:', error.message)
        process.exit(1)
      }
    })

  try {
    program.parse(process.argv)
  }
  catch (error) {
    console.error(error.message)
    program.outputHelp()
    process.exit(1)
  }

  if (process.argv.length <= 2) {
    program.outputHelp()
  }
}

export default runCLI
