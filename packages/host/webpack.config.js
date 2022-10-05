const HtmlPlugin = require("html-webpack-plugin")
const MFEPlugin = require("webpack/lib/container/ModuleFederationPlugin")
const { VueLoaderPlugin } = require("vue-loader")
const webpack = require("webpack")

module.exports = (env) => {
    const dotenv = require("dotenv").config({ path: `./.env${ env.app_env ? "." + env.app_env : "" }` });

    return {
        output: {
            publicPath: dotenv.parsed.APP_URL + "/"
        },

        resolve: {
            extensions: [ ".vue", ".jsx", ".js", ".json"],
        },

        devServer: {
            port: 3000
        },

        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader", "postcss-loader"]
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                }
            ]
        },

        plugins: [
            new webpack.DefinePlugin({ "process.env": JSON.stringify(dotenv.parsed), }),
            new VueLoaderPlugin(),
            new MFEPlugin({
                name: "starter",
                filename: "remoteEntry.js",
                remotes: {},
                exposes: {},
                shared: require("./package.json").dependencies
            }),
            new HtmlPlugin({
                template: "./src/index.html",
                inject: dotenv.parsed
            })
        ]
    }
}