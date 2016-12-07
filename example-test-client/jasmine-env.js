/**
 * Wrapper for preventing global Jasmine variables usage.
 */

define(function() {
    "use strict";

    // eslint-disable-next-line no-undef
    return window.jasmine.getEnv();
});
