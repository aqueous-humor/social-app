const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

const CURRENT_WORKING_DIR = process.cwd();

const config = {
    entry: [path.join(CURRENT_WORKING_DIR, "/server/server.js")],
    output: {
        path: path.join(CURRENT_WORKING_DIR, "/dist"),
        filename: "server.generated.js",
        library: {
            type: "commonjs2"
        },
        publicPath: "/dist/"
    },
    externalsPresets: {
        node: true  // Ignore node built in modules
    },
    externals: [nodeExternals()], //Ignore entire `node_modules` folder
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
        ]
    }
};

module.exports = config;