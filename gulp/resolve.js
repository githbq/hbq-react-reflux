var path = require('path');
module.exports = {
    extensions: ['', '.coffee', '.js', '.jsx'],
    alias: {
        global: path.resolve(__dirname, '../', './components'),
        components: path.resolve(__dirname, '../', './src/components'),
        modules: path.resolve(__dirname, '../', './src/modules'),
        lib: path.resolve(__dirname, '../', './src/lib'),
        page: path.resolve(__dirname, '../', './src/page')
    }
};
