const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlBeautifyPlugin = require("@entr/html-beautify-webpack-plugin");
const fs = require("fs");

const CopyWebpackPlugin = require("copy-webpack-plugin");

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map((item) => {
        const parts = item.split(".");
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: false,
            minify: {
                collapseWhitespace: false
            }
        });
    });
}

const htmlPlugins = generateHtmlPlugins("./src/html/views");

module.exports = {
    entry: ["./src/js/index.js", "./src/scss/style.scss"],
    output: {
        filename: "./js/bundle.js",
    },
    devtool: "source-map",
    module: {
        rules: [{
                test: /\.js$/,
                include: path.resolve(__dirname, "src/js"),
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                },
            },
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, "src/scss"),
                use: ExtractTextPlugin.extract({
                    use: [{
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                url: false,
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, "src/html/includes"),
                use: [{
                    loader: 'raw-loader',
                    options: {
                        esModule: false,
                    },
                }, ],
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "./css/style.bundle.css",
            allChunks: true,
        }),
        new CopyWebpackPlugin([{
                from: "./src/fonts",
                to: "./fonts",
            },
            {
                from: "./src/favicon",
                to: "./favicon",
            },
            {
                from: "./src/img",
                to: "./img",
            },
            {
                from: "./src/uploads",
                to: "./uploads",
            },
            {
                from: '/node_modules/slick-carousel/slick/ajax-loader.gif',
                to: './dist/css/ajax-loader.gif',
                toType: 'file'
            }
            
        ]),
    ].concat(htmlPlugins)
};