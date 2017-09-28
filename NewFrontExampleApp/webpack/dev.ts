import * as path from 'path';
import * as webpack from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const config: webpack.Configuration = {
   entry: [
      'react-hot-loader/patch',
      path.resolve(__dirname, '../src/index'),
   ],

   output: {
      filename: 'app.js',
      // TODO: HE HE ... HE zgadnij arek co to zrobi :]
      path: __dirname + '../dist', // Note: Physical files are only output by the production build task `npm run build`.
      publicPath: '/',
   },

   target: 'web',

   devtool: 'inline-source-map', // TODO: There are also "source-map" and "eval-source-map", check the differences

   // Which files axtensions are automatically checked when using "import" statement
   resolve: {
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
   },

   module: {
      rules: [
         {
            exclude: path.resolve(__dirname, '../node_modules'),
            include: path.resolve(__dirname, '../src'),
            loaders: [
               'react-hot-loader/webpack',
               'awesome-typescript-loader',
            ],
            test: /\.tsx?$/,
         },
         { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader', exclude: [/node_modules/] },
         { test: /\.json$/, loader: 'json-loader' },
         // {test: /(\.css|\.scss|\.sass)$/, loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader', 'sass-loader?sourceMap']}
         // { test: /\.css$/, use: ExtractTextPlugin.extract('css-loader') },
         { test: /\.css$/, loader: 'style-loader!css-loader' },
         { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
         { test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000' },
         { test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
         { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
         // { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      ],
   },
   plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
         template: './src/index.html',
         inject: true,
      }),
      // new ExtractTextPlugin('site.css'),
      // new webpack.ProvidePlugin({ // If we want to inject jQuery or some other nasty stuff
      //   $: 'jquery',
      //   jQuery: 'jquery',
      // }),
   ],
   devServer: {
      contentBase: path.resolve(__dirname, '../src'),
      // disableHostCheck: true,
      historyApiFallback: true,
      hot: true,
   },
};

export default config;
