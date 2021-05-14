/**
 * @fileoverview dir-name
 * @author
 */
'use strict';
var rule = require('../../../lib/rules/dir-name');
var RuleTester = require('eslint').RuleTester;

var ruleTester = new RuleTester();
ruleTester.run('dir-name', rule, {

    valid: [
        {
            code: '',
            filename: 'src/components/Button.jsx',
        },
        {
            code: '',
            filename: 'src/index.js',
        },
        {
            code: '',
            filename: 'src/__test__/test.js',
        },
        {
            code: '',
            filename: 'src/my-utils/test.js',
        },
    ],

    invalid: [
        {
            code: '',
            filename: 'User/src/$components/Button.jsx',
            errors: [
                {
                    message: 'Dirnames in \'User/src/$components\' should match pattern: \'^[a-zA-Z0-9_-]+$\'',
                },
            ],
        },
    ],
});
