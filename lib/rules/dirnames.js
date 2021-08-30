/**
 * @fileoverview dirnames
 * @author Deland Li
 */
'use strict';
var path = require('path');
var utils = require('../utils/index.js');

var DEFAULT_PATTERN = '^[a-zA-Z0-9_-]+$';

var parsePath = utils.parsePath;

module.exports = {
    meta: {
        docs: {
            description: 'Detect dirnames',
            category: 'Fill me in',
            recommended: false,
            url: 'https://github.com/Xooone47/eslint-plugin-dirs#dirsdirnames',
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
                var filePath = context.getFilename();
                var parsed = parsePath(filePath, cwd);
                var dirname = parsed.dirname;

                // ignore files in root dir
                if (dirname === '.') {
                    return;
                }

                var dirFragments = dirname.split(path.sep);

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
