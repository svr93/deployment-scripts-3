/**
 * Provides simple selector API.
 */

define([

    'selector-alias',
    'angular',
], function(Selector, angular) {
    "use strict";

    /**
     * Selects element from DOM tree.
     * @param {string} selector
     * @param {!(HTMLElement|Array<HTMLElement>)=} startNode
     * @return {!Object}
     */
    function $$(selector, startNode) {

        if (startNode && startNode.length === 1) {

            startNode = startNode[ 0 ]
        }
        return angular.element(Selector.$$(selector, startNode))
    }

    return Object.freeze($$)
})
