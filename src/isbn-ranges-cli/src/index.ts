import { Command } from 'commander';
import pack from '../package.json' with { type: 'json' };
import { convert } from './convert.js';

const program = new Command();

program
  .description('')
  .name('isbn-ranges-cli')
  .version(pack.version)
;

program
  .command('convert')
  .action((in_path: string, out_path: string) => {
    convert(in_path, out_path).then(() => {
      console.log('Done');
    }).catch(() => {
      console.log('Error');
    });
  })
  .argument('<in_path>', 'A path to an XML file.')
  .argument('[out_path]', 'A path to a JSON file.')
;

program.parse();

// const options = program.opts();
