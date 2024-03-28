import { resolve } from 'node:path';
import type { Configuration } from 'webpack';

const config: Configuration = {
  extends: resolve('..', 'webpack.config.ts'),
};

export default (
): Configuration => {
  return config;
};
