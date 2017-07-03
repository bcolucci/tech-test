
const { join } = require('path')

const srcDir = join(__dirname, 'src', 'client')

module.exports = {
  target: 'web',
  entry: join(srcDir, 'entry.js'),
  output: {
    path: join(__dirname, 'public', 'js'),
    filename: 'persons.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
