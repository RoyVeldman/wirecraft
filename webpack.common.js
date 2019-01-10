const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootEntry = './src/js/app.js';
const cleanFiles = ['./web/assets/*.js', './web/assets/*.css', './web/assets/*.map'];
const assetOutput = path.resolve(__dirname, 'web/assets');

const configureStaticFiles = [{
      context: './src/fonts',
      from: '**/*',
      to: 'fonts/'
   },
   {
      context: './src/icons',
      from: '**/*',
      to: 'icons/'
   }
];

const configureBabelLoader = () => {
   return {
      test: /\.m?js/,
      exclude: /(node_modules)/,
      use: {
         loader: 'babel-loader',
         options: {
            presets: ['@babel/preset-env']
         }
      }
   }
};

const configureCssLoader = () => {
   return {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
   }
};

const configureFileLoader = () => {
    return {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
            {
                loader: 'file-loader',
                options: {},
            }
        ]
    }
}

module.exports = {
   entry: {
      app: rootEntry
   },
   module: {
      rules: [
         configureBabelLoader(),
         configureCssLoader(),
         configureFileLoader()
      ]
   },
   plugins: [
      new CleanWebpackPlugin(cleanFiles),
      new MiniCssExtractPlugin({
         filename: "[name].css",
         chunkFilename: "[id].css"
      }),
      new CopyWebpackPlugin(configureStaticFiles)
   ],
   output: {
      filename: '[name].bundle.js',
      path: assetOutput
   }
};