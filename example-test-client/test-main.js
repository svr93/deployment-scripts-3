/**
 * Require.JS config file for test environment.
 */

/* global window */

/*
    eslint-disable
    requirejs/no-multiple-define,
    requirejs/no-named-define,
    requirejs/no-invalid-define
 */

// eslint-disable-next-line no-undef
document.body.appendChild(document.createElement('app'))

requirejs.config({

    baseUrl: 'base/client/src',
    paths: {

        'jasmine-env': '../../test-client/jasmine-env',
    },
    deps: Object
        .keys(window.__karma__.files)
        .filter(function(item) {

            // web-api + all non-AMD libs
            return item.match(/(global\/web-api|vendor\/ui-router-extras)/)
        }),
    callback: function() {
        "use strict";

        var testFileArr = Object
            .keys(window.__karma__.files)
            .filter(function(item) {

                return item.match(/test-client\//) &&
                    !item.match(/test-main.js/);
            });

        define('angular-ui-router', 'ct.ui.router.extras.dsr')

        requirejs(testFileArr, window.__karma__.start);
    },
});
