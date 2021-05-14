/**
 * @fileoverview dir-name
 * @author Deland Li
 */
'use strict';

var path = require('path');

var DEFAULT_PATTERN = '^[a-zA-Z0-9_-]+$';

var parsePath = (filePath = '', cwd = '') => {
    var absoluteFilename = path.resolve(filePath);
    var relativeFilename = path.relative(cwd, absoluteFilename);
    var dirname = path.dirname(relativeFilename);
    var filename = path.basename(relativeFilename);

    return {
        dirname,
        filename,
    };
};

module.exports = {
    meta: {
        docs: {
            description: 'dir-name',
            category: 'Fill me in',
            recommended: false,
            // url: '' // TODO
        },
        fixable: null,
        schema: [
            {
                type: 'object',
                properties: {
                    pattern: {
                        type: 'string',
                    },
                },
            },
        ],
    },

    create: function (context) {
        var options = context.options || [];
        var option = options[0] || {};
        var pattern = option.pattern || DEFAULT_PATTERN;
        var cwd = context.getCwd();

        return {
            'Program': function (node) {
                var filename = context.getFilename();
                var parsed = parsePath(filename, cwd);
                var dirname = parsed.dirname;
                var dirFragments = dirname.split('/');

                var isDirnameValid = true;
                for (var i = 0; i < dirFragments.length; i++) {
                    var regex = new RegExp(pattern);
                    var dir = dirFragments[i];
                    var result = regex.test(dir);
                    if (!result) {
                        isDirnameValid = false;
                        break;
                    }
                }

                if (!isDirnameValid) {
                    context.report(
                        node,
                        'Dirnames in \'{{dirname}}\' should match pattern: \'{{pattern}}\'',
                        {
                            dirname,
                            pattern,
                        }
                    );
                }
            },
        };
    },
};
