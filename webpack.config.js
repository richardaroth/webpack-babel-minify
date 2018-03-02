const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const path = require('path');
const prod = process.argv.indexOf('-p') !== -1;
const webpack = require('webpack');

const config = {
	context: path.resolve(__dirname, './src'),
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, './build'),
		filename: '[name].min.js'
	},
	module: {
		rules: [{			
			test: /\.js$/,
			include: path.resolve(__dirname, './src')
		},
		{
	        test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				fallback: 'style-loader',
				use: 'css-loader!sass-loader'
			})
		}]
	},
	plugins: [
		new ExtractTextPlugin('main.css')
	]
};

if (prod) {
	config.plugins.push(
		new MinifyPlugin()
	);
} else {
	config.devtool = 'inline-source-map'
}

module.exports = config