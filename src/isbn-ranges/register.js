import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));
// register('ts-node/esm', pathToFileURL(import.meta.dirname));
