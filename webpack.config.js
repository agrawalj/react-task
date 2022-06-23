const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    mode: "development", // >> webpack displays warning if its not set
    entry: "./src/index.tsx", // >>instructs entry point for webpack
    target: "web", // >> instructs webpack to target a specific environment, node env or browser env
    output: { // >> determines the output configuration of the bundled file.
        //filename: "bundle.[contentHash].js", // >> instructs webpack what should be the name of the bundled file
        path: path.resolve(__dirname, "dist/"), // >> instructs webpack the location to dump the bundle file 
        publicPath: '/',
    },
    plugins: [  /* >> Plugins work at bundle or chunk level and usually work at the end of the bundle generation process. 
                Plugins can also modify how the bundles themselves are created. Plugins have more powerful control than loaders.
                */
        new HtmlWebpackPlugin({ // >> this plugin will create a dynamic HTML file and append the script file as per the latest build
            template: "./src/index.html", // >> this  will append our <div id='root'> while building
        }),
    ],
    resolve: { // >> instructs webpack how file paths, extensions e.t.c are resolved in your codebase
        modules: [__dirname, "src", "node_modules"], // >> instructs webpack the location of folder to resolve
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"], // >> instructs webpack the extensions to resolve
    },
    devServer: { // >> https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually
        port: 3000,
        historyApiFallback: true,
        proxy: {
            '/api': {
                target: 'https://api.contentstack.io/v3',
                changeOrigin: true,
                pathRewrite: { "^/api": "" }
            }

        },

    },
    module: { // >> This option is used to configure how different types of module are treated in a project
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.png|svg|jpg|gif$/,
                use: ["file-loader"],
            },
        ],
    },
};