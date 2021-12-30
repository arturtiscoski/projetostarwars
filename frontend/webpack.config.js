const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.jsx|js?$/,
        use: [
          {
            loader: "babel-loader",
            query: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                ["@babel/plugin-proposal-class-properties", { "loose": false }],
                ["import", { libraryName: "antd", style: true }]
              ],
              compact: false
            }
          },
        ]
      },
      {
        test: /\.css$/,
        exclude: [
          path.resolve(__dirname, 'node_modules/react-datepicker/dist/react-datepicker.css')
        ],
        use: ["style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true
            },
          }
        ],
      },
      {
        test: [
          /node_modules[\\/]react-datepicker[\\/]dist[\\/]react-datepicker\.css/
        ],
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
        }]
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader",
          options: {
            modifyVars: {
              "primary-color": "#00adb8",
              "font-size-base": "13px"
            },
            javascriptEnabled: true
          },
        }]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
}