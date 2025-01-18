module.exports = {
    // ...existing configuration...
    module: {
      rules: [
        // ...existing rules...
        {
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: /node_modules\/react-select-async-paginate\/node_modules\/react-is-mounted-hook/
        }
      ]
    }
  };