var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = [
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract('css!postcss')
  },
  {
    test: /\.less$/,
    loader: ExtractTextPlugin.extract('css!postcss!less')
  },
  {
    test: /\.(png|jpg|jpeg|gif|webp|svg)$/,
    loader: 'url-loader?name=images/[name].[hash:10].[ext]&limit=8192' // <8k的图片，输出为base64 dataurl
  },
  {
    test: /\.(ttf|otf|woff|woff2|eot)$/,
    loader: 'url-loader?name=fonts/[name].[hash:10].[ext]&limit=1024'
  },
  {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules)/,
    loader: 'babel', // react jsx编译，可以使用es6
    query: {
        presets:['react', 'es2015']
    }
  },
  {
      test: /\.html$/,
      loader: 'raw'
  }
];
