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
   };
};
