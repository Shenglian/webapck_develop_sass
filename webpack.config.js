// 開發模式不需要製作 css 
var webpack = require('webpack');
var path = require('path');
var bower_dir = __dirname + '/bower_components';

var config = {
	addVendor: function (name, path) {
	    this.resolve.alias[name] = path;
	    this.module.noParse.push(new RegExp('^' + name + '$'));
	},
	entry: {
		pages: ["./js/pages/pages.js"],
		vendors: ['jquery','jquery-validation', 'URIjs']
	},
	resolve :{alias: {}},
	output: {
		path: "./dist",
		publicPath: "/dist/",
		filename: "[name].js",
	},
  	module: {
  		noParse: [],
  		loaders:[
  			{
  			  test   : /.scss$/,
  			  loader : 
  			     'style-loader!css-loader!sass-loader?includePaths[]=' 
  			      + path.resolve(__dirname, './node_modules/compass-mixins/lib')
  			}
  		]
	},
	plugins: [
	    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
	]
};

config.addVendor('jquery', bower_dir + '/jquery/dist/jquery.min.js');
config.addVendor('jquery-validation', bower_dir + '/jquery-validation/dist/jquery.validate.min.js');

module.exports = config;

