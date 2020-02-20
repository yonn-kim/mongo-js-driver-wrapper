var path = require('path');
var webpack = require("webpack");

var outputDir = path.resolve("./dist/");


var argv = require('yargs').argv;
var productionBuild = argv.p || false;
var devMode = process.env.NODE_ENV !== 'production';

if (productionBuild) {
    console.log("### production build is enabled. ga is included and javascript is optmized\r");
} else {
    console.log("### production build is disabled.\r");
}

if (argv.w || argv.watch) {
    console.log("### watch is enabled");
}
// If we omit the following line, the env var for module.exports will be undefined. It's weired.
console.log("### passed env is " + JSON.stringify(argv.env));

module.exports = function (env) {
    var wsaVersion = "default";

    if (env !== undefined && env.wsaVersion !== undefined) {
        wsaVersion = env.wsaVersion;
    }
    console.log("### frontend version is " + wsaVersion + "\r");

    var webpackConfig = {
        mode: 'production',
        performance: {
            hints: false,
        },
        entry: "./src/app.ts",
        output: {
            path: outputDir,
            publicPath: "/wsa/",
            filename: "./js/[name].js",
        },  externals: {
            "jquery": "jQuery"
        }, resolve: {
            modules: [
                path.join(__dirname, "src"),
                "node_modules",
            ],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    loader: 'babel-loader?cacheDirectory=true',
                    query: {
                        presets: ['es2015']
                    }
                },
                {
                  test: /\.js$/,
                  exclude: [/node_modules/],
                  loader: 'babel-loader?cacheDirectory=true',
                  query: {
                      presets: ['es2015']
                  }
                },
                {
                    test: /\.js$/,
                    exclude: [/node_modules/, /3rd-party/],
                    loader: 'babel-loader?cacheDirectory=true',
                    query: {
                        presets: ['es2015', 'es2017', "stage-0"],
                        plugins: ['transform-decorators-legacy']
                    },
                },
                {
                  test: /\.tsx?$/,
                  loader: "ts-loader",
                  exclude: /node_modules/,
                },
            ]
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                debug: !productionBuild,
                options: {
                    context: __dirname,
                    htmlLoader: {
                        ignoreCustomFragments: "[/\{\{.*?}}/]"
                    }
                }
            }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 10
            }),
        ]
    };

    if (!productionBuild) {
        console.log("### sourcemap is enabled.\r");
        webpackConfig.devtool = "#inline-source-map";
    } else {
        console.log("### sourcemap is disabled.\r");
    }

    return webpackConfig;
};
