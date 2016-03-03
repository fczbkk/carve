module.exports = {
  entry: './src/index.js',
  output: {
    path: './lib/browser',
    filename: 'index.js',
    library: 'Carve',
    libraryTarget: 'var'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader']
      }
    ]
  },
  devtool: 'source-map'
};