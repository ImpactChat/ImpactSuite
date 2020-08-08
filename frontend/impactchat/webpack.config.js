const webpack = require('webpack');
const resolve = require('path').resolve;

const config = {
 entry: __dirname + '/src/index.jsx',
 output:{
      path: resolve('../public'),
      filename: 'bundle.js',
      publicPath: resolve('../public')
},
 resolve: {
  extensions: ['.js','.jsx','.css']
 },
};

module.exports = config;
