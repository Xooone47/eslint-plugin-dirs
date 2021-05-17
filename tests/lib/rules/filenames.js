/**
 * @fileoverview filenames
 * @author Deland Li
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/filenames');

var RuleTester = require('eslint').RuleTester;


// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run('filenames', rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: '\'$a.js\'',
            errors: [
                {
                    message: 'Fill me in.',
                    type: 'Me too',
                },
            ],
        },
    ],
});
