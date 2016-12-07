/**
 * Require.JS config file for test environment.
 */

/* global window */

requirejs.config({

    baseUrl: 'base/client/src',
    paths: {

        'jasmine-env': '../../test-client/jasmine-env',
    },
    deps: Object
        .keys(window.__karma__.files)
        .filter(function(item) {

            return item.match(/global\/web-api/); // + all non-AMD libs
        }),
    callback: function() {
        "use strict";

        var testFileArr = Object
            .keys(window.__karma__.files)
            .filter(function(item) {

                return item.match(/test-client\//) &&
                    !item.match(/test-main.js/);
            });
        requirejs(testFileArr, window.__karma__.start);
    },
});
