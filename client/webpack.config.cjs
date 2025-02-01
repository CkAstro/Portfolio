/* eslint-env node */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge: webpackMerge } = require('webpack-merge');
const webpackDev = require('../webpack/webpack.dev.cjs');
const webpackProd = require('../webpack/webpack.prod.cjs');

const root = path.resolve(__dirname, '.');
function bundler(pack, env) {
   const isProduction = process.env.NODE_ENV === 'production';

   const webpackConfig = pack();

   if (env.showBundleAnalysis) {
      return webpackMerge(webpackConfig, webpackProd(), {
         plugins: [
            new BundleAnalyzerPlugin({
               defaultSizes: 'parsed',
               openAnalyzer: true,
            }),
         ],
      });
   }
   if (isProduction) {
      return webpackMerge(webpackConfig, webpackProd());
   }
   return webpackMerge(webpackConfig, webpackDev());
}

function webpackFrontEnd() {
   return {
      context: path.resolve(root, 'src'),
      entry: ['./index'],
      output: {
         path: path.resolve(root, 'dist'),
         filename: '[name].[contenthash].js',
         assetModuleFilename: '[name].[contenthash][ext]',
         publicPath: '/',
         hashDigestLength: 10,
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
                  exclude: [
                     '**/*.test.js',
                     '**/*.test.jsx',
                     '**/*.test.ts',
                     '**/*.test.tsx',
                     'server',
                  ],
               },
            },
         }),
         new HtmlWebpackPlugin({
            template: '../public/template.html',
            favicon: '../public/favicon.ico',
         }),
         new CopyWebpackPlugin({
            patterns: [{ from: '../public', noErrorOnMissing: false }],
         }),
         new Dotenv({ path: '.env' }),
      ],
      resolve: {
         alias: {
            '@/types': path.resolve(root, '../types'),
            '@/core': path.resolve(root, '../core'),
            '@/test': path.resolve(root, 'test'),
            '@': path.resolve(root, 'src'),
         },
         extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
      module: {
         rules: [
            {
               test: /\.(j|t)s(x?)$/,
               exclude: /node_modules/,
               use: ['babel-loader'],
            },
            {
               test: /\.(png|jpg|jpeg|gif|bmp|webp)$/,
               type: 'asset',
            },
            {
               test: /\.(woff2|woff|ttf)$/,
               type: 'asset/resource',
            },
            {
               test: /\.svg$/,
               type: 'asset',
               generator: {
                  dataUrl: (content) => svgToMiniDataURI(content.toString()),
               },
            },
            {
               test: /\.(s?)css$/,
               use: [
                  'style-loader',
                  {
                     loader: 'css-loader',
                     options: {
                        modules: {
                           localIdentName: '[local]_[hash:base64:5]',
                        },
                     },
                  },
                  'postcss-loader',
                  {
                     loader: 'sass-loader',
                     options: {
                        api: 'modern',
                     },
                  },
               ],
            },
         ],
      },
      // stats: 'errors-warnings',
      stats: {
         errorDetails: true,
         logging: 'verbose',
      },
   };
}

module.exports = function (env = {}) {
   return bundler(webpackFrontEnd, env);
};
