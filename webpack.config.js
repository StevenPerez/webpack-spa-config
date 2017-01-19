var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var DEBUG = process.env.NODE_ENV !== 'production';

var DIST_DIR = path.resolve(__dirname, './app/dist');
var CSS_VENDOR_DIR = path.resolve(__dirname, './app/dist/style');
var APP_FILE_PATH = path.resolve(__dirname, './app/src/js/app');

module.exports = {
	entry: APP_FILE_PATH,
	output: {
		path: DIST_DIR,
		filename: 'js/bundle.js',
		publicPath: '/dist/',
		sourceMapFilename: 'sourcemaps/[file].map',
	},
	resolve: {
		modules: [
			'node_modules',
			path.resolve(__dirname, 'app'),
		],
		extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
		descriptionFiles: ['package.json'],
		plugins: [],
	},
	module: {
		// Module configuration
		rules: [
			{
				// Remember the import. e.g. import '../style/index.scss';
				test: /\.(sass|scss)$/,
				loader: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader/url!file-loader',
					loader: ['css-loader', 'sass-loader'],
					publicPath: CSS_VENDOR_DIR,
				}),
			},
			{
				test: /\.(js|jsx)?$/,
				loader: 'babel-loader',
				include: [
					path.resolve(__dirname, 'app'),
				],
				exclude: /(node_modules|bower_components)/,
				options: {
					presets: ['es2015'],
				},
			},
		],
	},
	devtool: DEBUG ? 'source-map' : '',
	context: __dirname,
	target: 'web',
	plugins: DEBUG ? [
			new ExtractTextPlugin({
				filename: 'style/bundle.css',
				disable: false,
				allChunks: true,
			}),
		] : [
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: false,
				mangle: false,
			}),
			new ExtractTextPlugin({
				filename: 'style/bundle.css',
				disable: false,
				allChunks: true,
			}),
			new OptimizeCssAssetsPlugin({
				assetNameRegExp: 'bundle.css',
				cssProcessor: require('cssnano'),
				cssProcessorOptions: {discardComments: {removeAll: true}},
				canPrint: true,
			}),
		],
	cache: false,
	watch: true,
	watchOptions: {
		aggregateTimeout: 1000,
		poll: true,
	},
};
