/**
 * Controller for built-in global variables.
 */

/* global window */
/* eslint-disable requirejs/no-multiple-define, requirejs/no-named-define */

define([

    'bluebird',
], function(Promise) {
    "use strict";

    window.Promise = Promise

    // ES6 module system should help us avoid yet more
    // such global namespace-object additions.
    // https://esdiscuss.org/topic/why-do-json-date-and-math-exist

    /**
     * standard pseudo-module
     * http://wiki.ecmascript.org/doku.php?id=harmony:modules_standard#math
     */
    define('@math', function() { return makeModule(window.Math); });

    /**
     * standard pseudo-module
     * http://wiki.ecmascript.org/doku.php?id=harmony:modules_standard#json
     */
    define('@json', function() { return makeModule(window.JSON); });

    /**
     * Crypto API for JWT / Math.random analog.
     */
    define('@browser/crypto', function() {

        //noinspection JSUnresolvedVariable
        const cryptoObj = window.crypto || window.msCrypto;
        if (!cryptoObj.subtle) {

            //noinspection JSUnresolvedVariable
            cryptoObj.subtle = cryptoObj.webkitSubtle;
        }
        return Object.freeze(cryptoObj);
    });

    /**
     * Creates safe module.
     * @param {!Object} obj
     * @return {!Object}
     */
    function makeModule(obj) {

        return Object.freeze(Object.create(obj));
    }
});
