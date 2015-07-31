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
		index: ["./js/components/index.js"],
		detail: ["./js/components/detail.js"],
		common: ['jquery','jquery-validation', 'URIjs']
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
	  			test : /\.(woff|ttf|svg|eot|jpg|png|git)$/, 
	  			loader: 'url-loader?limit=8000'
	  		},
  			{
  			  	test   : /.scss$/,
  			  	loader : 'style-loader!css-loader!sass-loader?includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib')
  			},
  			{
		        test: /\.js$/,
		        loader: 'babel'
		    }
  		]
	},
	plugins: [
	    new webpack.optimize.CommonsChunkPlugin('common', 'common.js')
	]
};

config.addVendor('jquery', bower_dir + '/jquery/dist/jquery.min.js');
config.addVendor('jquery-validation', bower_dir + '/jquery-validation/dist/jquery.validate.min.js');

module.exports = config;

