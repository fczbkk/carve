module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: [
      'jasmine'
    ],
    files: [
      'src/**/*.spec.js'
    ],
    preprocessors: {
      'src/**/*.spec.js': ['webpack']
    },
    webpack: {
      module: {
        loaders: [
          {
            test: /\.js$/,
            loaders: ['babel-loader']
          }
        ],
        devtool: 'source-map'
      }
    },
    reporters: [
      'mocha'
    ],
    mochaReporter: {
      output: 'minimal'
    },
    browsers: [
      'PhantomJS'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false
  });
};