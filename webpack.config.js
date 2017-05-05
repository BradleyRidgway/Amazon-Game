module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
	node: {    net: "empty",    tls: "empty" },
    module: {
    }
};