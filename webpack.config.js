const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopmentMode = process.env.NODE_ENV === 'development';
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
  // production では minify されるなど（？）の違いがあるらしい
  mode: process.env.NODE_ENV,
  entry:  {
    // キー名を [name] プレースホルダーとして output などで使える
    // 1つのキーで1つのエントリポイント（JS）となる
    index: './src/index.js',
  },
  module: {
    rules: [
      {
        // ルールを適用する対象のファイルを指定
        test: /\.css$/i,
        // 後ろから前へ実行される
        use: [
          //
          'style-loader',
          //
          'css-loader',
        ]
      },
      {
        test: /\.(svg|png|jpg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },
  plugins: [
    // HtmlWebpaclPlugin を使わない場合、自前でHTMLファイルを用意して生成されたJSへのパスを通しておく必要がある
    new HtmlWebpackPlugin({
      title: 'App',
      template: 'templates/index.html', // default 'index.html'
      filename: '[name].html'
    })
  ],
  // 複数のエントリポイントに適用される出力方式
  output: {
    filename: '[name]-bundle.js',
    path: outputPath,
    clean: true,
  },
  // バンドルのファイル分割
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: { // このキー名は外部から参照する？ キー名が name に使われはしなかった
          name: 'vendors',
          chunks: 'initial',
          test: /\/node_modules\//,
        }
      }
    },
  },
  // webpack-dev-server によって HMR を実装できる
  // webpack-dev-server によって webpack コマンドに serve サブコマンドが生える
  // webpack コマンドの watch オプションに HMR は実装されていない
  devServer: {
    // Mac でローカル開発する場合、 hosts ファイルにホスト名の追記が必要
    host: 'webpack-base.sandbox',
    port: '3000',
    static: {
      directory: outputPath
    },
    // HMR を有効にする。有効にすると、最小限の範囲でよしなにリロードしてくれる
    // 監視対象ファイルが更新されたら ~update.json|js の通信が発生する
    hot: true,
  },
  // ソースマップを本番ビルドに乗せないようにしないとバンドルファイルのサイズがかなり大きくなるので注意
  devtool: isDevelopmentMode ? 'inline-source-map' : false,
};
