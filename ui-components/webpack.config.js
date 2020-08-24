var glob = require("glob");

function toObject(paths) {
    var ret = {};

    paths.forEach(function(path) {
        // you can define entry names mapped to [name] here
        var pathParts = path.split('/');
        var filename = pathParts.slice(-1)[0];
        var appName = pathParts.slice(-3)[0];
        var buildDestination = appName + '/' + filename;
        ret[buildDestination] = path;
    });

    return ret;
}

console.log(glob.sync('./src/pages/**/*.jsx'))
const config = {
    entry: toObject(glob.sync('./src/pages/**/*.jsx')),
    output: {
        filename: "[name]",
        path: __dirname + "/../static/dist/"
    },
    mode: "development",

    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            }
        ]
    }
};

module.exports = config;
