import type { PathLike } from 'fs';
import { parse } from './parse.js';
import { read } from './read.js';
import { write } from './write.js';

async function convert(in_path: PathLike, out_path: PathLike) {
  const xmlData = await read(in_path);
  const data = parse(xmlData);
  const jsonData = JSON.stringify(data, null, 0);
  if (!jsonData) {
    throw new ReferenceError('No data to output');
  }
  await write(out_path, jsonData);
}

export {
  convert,
};
