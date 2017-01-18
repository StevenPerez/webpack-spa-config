var path = require('path');

module.exports = {
	entry: './app/src/js/app.jsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/public/',
		sourceMapFilename: '[file].map',
		sourceMapFilename: 'sourcemaps/[file].map',
	},
};
//https://webpack.js.org/configuration/
