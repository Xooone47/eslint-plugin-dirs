/**
 * @fileoverview filenames
 * @author Deland Li
 */
'use strict';

var rule = require('../../../lib/rules/filenames');

var RuleTester = require('eslint').RuleTester;


var ruleTester = new RuleTester();
ruleTester.run('filenames', rule, {

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
            filename: 'src/utils/index.ts',
        },
        {
            code: '',
            filename: 'src/utils/index.ts',
            options: [{'src/utils/**/*': ['^[A-Za-z_-]+$', false]}],
        },
        {
            code: '',
            filename: 'src/components/index.js',
            options: [{'src/utils/**/*': ['^[A-Za-z_-]+$', true]}],
        },
        {
            code: '',
            filename: 'src/components/Button.js',
            options: [{'src/utils/**/*': '^[A-Za-z_-]+$'}],
        },
    ],

    invalid: [
        {
            code: '',
            filename: 'src/$a.js',
            errors: [
                {
                    message: 'Filename \'$a\' should match pattern: \'^[a-zA-Z0-9_-]+$\'',
                },
            ],
        },
        {
            code: '',
            filename: 'src/utils/b+.js',
            errors: [
                {
                    message: 'Filename \'b+\' should match pattern: \'^[a-zA-Z0-9_-]+$\'',
                },
            ],
        },
        {
            code: '',
            filename: 'src/utils/index.js',
            options: [{'src/utils/**/*': ['^[A-Za-z_-]+$', true]}],
            errors: [
                {
                    message: 'Disallow naming file as "index"',
                },
            ],
        },
    ],
});
