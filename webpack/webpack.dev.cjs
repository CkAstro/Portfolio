// cspell:words pmmmwh
/* eslint-env node */

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = function () {
   return {
      mode: 'development',
      plugins: [
         new ReactRefreshWebpackPlugin({
            overlay: false,
         }),
      ],
      devServer: {
         hot: true,
         port: 3000,
         static: false,
         compress: true,
         host: '0.0.0.0',
         allowedHosts: 'all',
         client: {
            logging: 'warn',
            overlay: false,
         },
         historyApiFallback: true,
      },
      devtool: 'source-map',
      module: {
         rules: [
            {
               /* separate loader for non-module (index.scss) require so that
                * production and development can both use global classes without
                * requiring :global {} definition
                */
               test: /\.(s?)css$/,
               exclude: /\.module\.scss$/,
               use: [
                  'style-loader',
                  'css-loader',
                  'postcss-loader',
                  {
                     loader: 'sass-loader',
                     options: {
                        api: 'modern',
                     },
                  },
               ],
            },
            {
               test: /\.module\.(s?)css$/,
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
   };
};
