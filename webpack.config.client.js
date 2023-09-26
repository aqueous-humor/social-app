const path = require("path");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const CURRENT_WORKING_DIR = process.cwd();

const config = {
    mode: "development",
    entry: [
        "webpack-hot-middleware/client",
        path.join(CURRENT_WORKING_DIR, "/client/main.js")
    ],
    output: {
        path: path.join(CURRENT_WORKING_DIR, "/dist"),
        filename: "bundle.js",
        publicPath: "/dist/",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: require.resolve("babel-loader"),
                    options: {
                        plugins: [require.resolve("react-refresh/babel")]
                    }
                },
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ReactRefreshWebpackPlugin()
    ],
    resolve: {
        extensions: [".js", ".jsx"],
    }
};

module.exports = config;