var path = require("path");
var webpack = require("webpack");
const outputPath = 'dist';

module.exports = {
	mode: 'development',
	resolve: {
		extensions: [".js", ".jsx"]
	},
	entry: {
		react: ["react", "react-dom","react-transition-group","react-modal", "redux","react-redux","redux-logger","redux-thunk"],
		utility: ["classnames","velocity-animate",]
	},
	output: {
		path: path.join(__dirname, outputPath),
		filename: "[name].dll.js",
		library: "[name]"
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, outputPath, "[name]-manifest.json"),
			name: "[name]"
		})
	]
};