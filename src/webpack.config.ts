import { resolve } from 'node:path';
import TerserPlugin from 'terser-webpack-plugin';
import type { Configuration } from 'webpack';

const rootDirectoryPath = resolve('.');
const outputDirectoryPath = resolve('dist');
const sourceDirectoryPath = resolve('src');

const config: Configuration = {
  context: rootDirectoryPath,
  entry: {
    index: resolve(sourceDirectoryPath, 'index.ts'),
  },
  experiments: {
    outputModule: true,
  },
  externalsType: 'module',
  module: {
    rules: [
      {
        // exclude: [
        //     '/node_modules/',
        // ],
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true,
              useCaseSensitiveFileNames: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  output: {
    clean: true,
    filename: '[name].js',
    library: {
      type: 'module',
    },
    module: true,
    path: outputDirectoryPath,
  },
  resolve: {
    //   // alias: {
    //   //     '@App': sourceDirectoryPath,
    //   // },
    extensionAlias: {
      /**
       * @see {@link https://github.com/webpack/webpack/releases/tag/v5.74.0}
       */
      '.js': [
        '.ts',
      ],
    },
    extensions: [
      '.ts',
      '.js',
    ],
    //   // mainFiles: [
    //   //   'index',
    //   // ],
    //   // modules: [
    //   //   sourceDirectoryPath,
    //   //   'node_modules',
    //   // ],
    //   // plugins: [
    //   //   // Handles `paths` from `tsconfig.json`.
    //   //   new TsconfigPathsPlugin({
    //   //     extensions: [
    //   //       '.ts',
    //   //     ],
    //   //   }),
    //   // ],
  },
  target: 'node20.11',
};

/**
 * @see {@link https://github.com/webpack/webpack/issues/11630/}
 */
export default (
  _: Record<string, unknown>,
  argv: Record<string, unknown>,
): Configuration => {
  const production = (argv['nodeEnv'] === 'production');
  return {
    ...config,
    devtool: production ? 'source-map' : 'eval-source-map',
    mode: production ? 'production' : 'development',
    name: production ? 'prod-webpack-config' : 'dev-webpack-config',
    plugins: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: production,
          format: {
            comments: false,
          },
        },
      }),
    ],
  };
};
