const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devServer: {
    port: 3001,
    open: true, //opens default web browser
    hot: true, // see the changes without refresh the whole page
    historyApiFallback: true, //It sets up HTML5 History API fallback to support client-side routing in a single-page application
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      }
    ],
  },
};
