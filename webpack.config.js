const path = require( 'path' );
const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ( env, options ) => {
	return {
        module: {
            rules: [
                {
                    test: /\.(j|t)(s|sx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    options: {
                      presets: ["@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript"]
                    }
                  }
            ]
        }
    }
};