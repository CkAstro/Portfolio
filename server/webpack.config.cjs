/* eslint-env node */

const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const root = path.resolve(__dirname, '.');

module.exports = function () {
   return {
      target: 'node',
      mode: 'development',
      context: path.resolve(root, 'src'),
      entry: ['./index'],
      output: {
         path: path.resolve(root, 'dist'),
         filename: 'server.cjs',
      },
      plugins: [
         new ForkTsCheckerWebpackPlugin({
            typescript: {
               configFile: path.resolve(root, 'tsconfig.json'),
               configOverwrite: {
                  compilerOptions: {
                     skipLibCheck: true,
                     sourceMap: false,
                     inlineSourceMap: false,
                     declarationMap: false,
                  },
                  exclude: ['**/*.test.js', '**/*.test.ts'],
               },
            },
         }),
         new NodemonPlugin(),
      ],
      resolve: {
         alias: {
            '@/types': path.resolve(root, '../types'),
            '@/core': path.resolve(root, '../core'),
            '@/test': path.resolve(root, 'test'),
            '@': path.resolve(root, 'src'),
         },
         extensions: ['.js', '.ts', '.json'],
      },
      module: {
         rules: [
            {
               test: /\.(j|t)s(x?)$/,
               exclude: /node_modules/,
               use: ['ts-loader'],
            },
         ],
      },
      stats: 'errors-warnings',
      externals: [nodeExternals()],
   };
};
