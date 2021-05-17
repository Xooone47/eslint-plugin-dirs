/**
 * @fileoverview filenames
 * @author Deland Li
 */
'use strict';
var micromatch = require('micromatch');
var get = require('lodash.get');
var keys = require('lodash.keys');
var utils = require('../utils/index.js');

var isMatch = micromatch.isMatch;
var parsePath = utils.parsePath;

var DEFAULT_OPTION = {
    'src/**/*': ['^[a-zA-Z0-9_-]+$', false],
};

module.exports = {
    meta: {
        docs: {
            description: 'Detect filenames',
            category: 'Fill me in',
            recommended: false,
            url: 'https://github.com/Xooone47/eslint-plugin-dirs#dirsfilenames',
        },

        schema: [
            {
                type: 'object',
            },
        ],
    },

    create: function (context) {
        var option = get(context, 'options[0]', DEFAULT_OPTION);
        var cwd = context.getCwd();
        console.log('--------------');
        console.log(option);

        return {
            'Program': function (node) {
                var filePath = context.getFilename();
                var parsed = parsePath(filePath, cwd);
                var dirname = parsed.dirname;
                var filename = parsed.filename;
                var relativePath = parsed.relativePath;

                console.log(dirname, filename, relativePath);

                // ignore files in root dir
                if (dirname === '.') {
                    return;
                }

                var globPatterns = keys(option);
                var currentOption = null;
                for (var i = 0; i < globPatterns.length; i++) {
                    var pattern = globPatterns[i];
                    if (isMatch(relativePath, pattern)) {
                        currentOption = option[pattern];
                        break;
                    }
                }
                console.log(currentOption);

                // var dirFragments = dirname.split('/');

                // var isDirnameValid = true;
                // for (var i = 0; i < dirFragments.length; i++) {
                //     var regex = new RegExp(pattern);
                //     var dir = dirFragments[i];
                //     var result = regex.test(dir);
                //     if (!result) {
                //         isDirnameValid = false;
                //         break;
                //     }
                // }

                // if (!isDirnameValid) {
                //     context.report(
                //         node,
                //         'Dirnames in \'{{dirname}}\' should match pattern: \'{{pattern}}\'',
                //         {
                //             dirname,
                //             pattern,
                //         }
                //     );
                // }
            },
        };
    },
};
