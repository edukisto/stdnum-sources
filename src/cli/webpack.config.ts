import { resolve } from 'node:path';
import webpack, { type Configuration } from 'webpack';

const config: Configuration = {
  extends: resolve('..', 'webpack.config.ts'),
  externals: [
    'commander',
    'fast-xml-parser',
  ],
  output: {
    path: resolve('bin'),
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    }),
  ],
};

export default (
): Configuration => {
  return config;
};
