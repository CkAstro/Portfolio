/* eslint-env node */

const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge: webpackMerge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

const root = path.resolve(__dirname, '.'); // root at project/server
const common = () => ({
   target: 'node',
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
});

const dev = () => ({
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
      static: 'dist',
      hot: true,
   },
   plugins: [new NodemonPlugin()],
});

const prod = () => ({
   mode: 'production',
   devtool: 'source-map',
   optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
   },
});

module.exports = function () {
   const isProduction = process.env.NODE_ENV === 'production';
   if (isProduction) return webpackMerge(common(), prod());
   return webpackMerge(common(), dev());
};
