"use strict";

/**
 * Karma config file.
 */

const path = require('path');

/**
 * Specifies configuration options.
 * @param {Object} config
 */
module.exports = function(config) {

    const vendorPathArr = [

        ]
        .map((item) => {

            return {

                pattern: path.join('client/src', path.format({

                    name: item,
                    ext: '.js',
                })),
                /**
                 * True for all non-AMD libs.
                 * @param {boolean}
                 */
                included: false,
            };
        });
    const optionObj = {

        frameworks: [ 'jasmine' ],
        browsers: [

            'Chrome',
            'Firefox',
            'Safari',
            'SafariTechPreview',
        ],
        concurrency: 1,
        browserNoActivityTimeout: 15000,
        singleRun: true,
        files: [

            { pattern: 'client/src/requirejs-config.js', included: true },
            { pattern: 'node_modules/requirejs/require.js', included: true },
            {
                pattern: 'node_modules/karma-requirejs/lib/adapter.js',
                included: true,
            },

            { pattern: 'client/src/requirejs-config.js', included: true },
            { pattern: 'client/src/global/web-api.js', included: false },
            { pattern: 'test-client/jasmine-env.js', included: false },
        ],
    };
    const baseFileArr = optionObj.files;
    optionObj.files = vendorPathArr.concat(baseFileArr, [

        'test-client/test-main.js',
    ]);
    config.set(optionObj);
};
