var path = require('path');

var parsePath = (filePath = '', cwd = '') => {
    var absolutePath = path.resolve(filePath);
    var relativePath = path.relative(cwd, absolutePath);

    var dirname = path.dirname(relativePath);
    var basename = path.basename(relativePath);
    var filename = path.parse(relativePath).name;

    return {
        dirname,
        basename,
        filename,
        relativePath,
    };
};

module.exports = {
    parsePath,
};
