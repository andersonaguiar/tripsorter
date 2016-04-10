loaders = (process.env.NODE_ENV === 'development') ? ['react-hot','babel'] : ['babel'];

module.exports = {
  devtool: 'eval',
  entry: './app-client.js',
  output: {
    path: __dirname + '/public/dist',
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: loaders,
        exclude: /node_modules/
      }
    ]
  }
};
