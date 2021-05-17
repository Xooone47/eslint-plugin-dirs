/**
 * @fileoverview filenames
 * @author Deland Li
 */
'use strict';
var micromatch = require('micromatch');
var get = require('lodash.get');
var keys = require('lodash.keys');
var isArray = require('lodash.isarray');
var utils = require('../utils/index.js');

var isMatch = micromatch.isMatch;
var parsePath = utils.parsePath;

var DEFAULT_OPTION = {
    'src/**/*': ['^[a-zA-Z0-9_-]+$', false],
};

function getCurrentOption(option, relativePath) {
    var globPatterns = keys(option);
    var currentOption = null;

    for (var i = 0; i < globPatterns.length; i++) {
        var pattern = globPatterns[i];
        if (isMatch(relativePath, pattern)) {
            currentOption = option[pattern];
            break;
        }
    }

    var fileRegex = '';
    var disallowIndex = false;

    if (typeof currentOption === 'string') {
        fileRegex = currentOption;
    } else if (isArray(currentOption)) {
        fileRegex = get(currentOption, '[0]');
        disallowIndex = get(currentOption, '[1]', false);
    }

    return {fileRegex, disallowIndex};
}

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

        return {
            'Program': function (node) {
                var filePath = context.getFilename();
                var parsed = parsePath(filePath, cwd);
                var dirname = parsed.dirname;
                var filename = parsed.filename;
                var relativePath = parsed.relativePath;

                // ignore files in root dir
                if (dirname === '.') {
                    return;
                }

                var parsedOptions = getCurrentOption(option, relativePath);
                var fileRegex = parsedOptions.fileRegex;
                var disallowIndex = parsedOptions.disallowIndex;

                // console.log(relativePath, filename, fileRegex, disallowIndex);

                // doesn't match any rule
                if (!fileRegex) {
                    return;
                }

                var isFileNameValid = true;
                if (filename === 'index') {
                    isFileNameValid = !disallowIndex;
                } else {
                    var regex = new RegExp(fileRegex);
                    isFileNameValid = regex.test(filename);
                }

                if (!isFileNameValid) {
                    if (filename === 'index') {
                        context.report(
                            node,
                            'Disallow naming file as "index"',
                        );
                    } else {
                        context.report(
                            node,
                            'Filename \'{{filename}}\' should match pattern: \'{{fileRegex}}\'',
                            {
                                filename,
                                fileRegex,
                            }
                        );
                    }
                }
            },
        };
    },
};
