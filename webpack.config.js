const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = {
  entry: "./js/script.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "./bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    compress: true,
    port: 9000
  },
  // generate default index.html file in build dir
  plugins: [
    new HtmlWebpackPlugin({
      title: "Instanews",
      template: "index.html"
    })
  ],
  // ...

  module: {
    rules: [
      // ...other loaders...
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  }

  // ...the rest
};
