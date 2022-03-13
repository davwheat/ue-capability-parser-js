const path = require('path');

const config = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  plugins: [
    // Apply minification only on the second bundle by
    // using a RegEx on the name, which must end with `.min.js`
    // NB: Remember to activate sourceMaps in UglifyJsPlugin
    // since they are disabled by default!
    // new webpack.optimize.UglifyJsPlugin({
    //   minimize: true,
    //   sourceMap: true,
    //   include: /\.min\.js$/,
    // })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

module.exports = config;
