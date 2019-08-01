const path = require(`path`);


module.exports = {

  entry: `./src/index.tsx`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: false,
    historyApiFallback: true,
    publicPath: `http://localhost:8085/`,
    hot: true,
    port: 8085
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.tsx?$/,
        loader: `ts-loader`
      }
    ],
  },
  devtool: `source-map`
};
