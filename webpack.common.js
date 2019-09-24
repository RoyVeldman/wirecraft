const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const rootEntry = './src/js/app.js';
const cleanFiles = [
   './web/assets/*.js',
   './web/assets/*.css',
   './web/assets/*.map',
];
const assetOutput = path.resolve(__dirname, 'web/assets');

const configureStaticFiles = [
   {
      context: './src/fonts',
      from: '**/*',
      to: 'fonts/',
   },
   {
      context: './src/icons',
      from: '**/*',
      to: 'icons/',
   },
];

const configureBabelLoader = () => ({
   test: /\.m?js/,
   exclude: /(node_modules)/,
   use: [
      {
         loader: 'babel-loader',
         options: {
            presets: [
               [
                  '@babel/preset-env',
                  {
                     useBuiltIns: 'usage',
                     corejs: 3,
                  },
               ],
            ],
         },
      },
      'eslint-loader',
   ],
});

const configureCssLoader = () => ({
   test: /\.(css|scss)$/,
   use: [
      MiniCssExtractPlugin.loader,
      {
         loader: 'css-loader',
         options: {
            sourceMap: true,
         },
      },
      'postcss-loader',
      {
         loader: 'sass-loader',
         options: {
            sourceMap: true,
            prependData: `
                        @import "./src/scss/abstracts/_variables.scss";
                        @import "./src/scss/abstracts/_mixins.scss";
                    `,
         },
      },
   ],
});

const configureFileLoader = () => ({
   test: /\.(png|jpg|gif|svg)$/,
   use: [
      {
         loader: 'file-loader',
         options: {},
      },
   ],
});

const configureVueLoader = () => ({
   test: /\.vue$/,
   loader: 'vue-loader',
});

module.exports = {
   entry: {
      app: rootEntry,
   },
   resolve: {
      alias: {
         vue$: 'vue/dist/vue.esm.js',
      },
      extensions: ['*', '.js', '.vue', '.json'],
   },
   module: {
      rules: [
         configureBabelLoader(),
         configureCssLoader(),
         configureFileLoader(),
         configureVueLoader(),
      ],
   },
   plugins: [
      new CleanWebpackPlugin({
         cleanOnceBeforeBuildPatterns: cleanFiles.map((filePath) => path.resolve(__dirname, filePath)),
      }),
      new CopyWebpackPlugin(configureStaticFiles),
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
         filename: '[name].css',
         chunkFilename: '[id].css',
      }),
   ],
   output: {
      filename: '[name].bundle.js',
      path: assetOutput,
   },
};
