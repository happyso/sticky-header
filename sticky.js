
(function (root, factory) {
    if ( typeof define === 'function' && define.amd ) {
        define([], factory(root));
    } else if ( typeof exports === 'object' ) {
        module.exports = factory(root);
    } else {
        root.stickyHeader = factory(root);
    }
})(typeof global !== 'undefined' ? global : this.window || this.global, (function (root) {

    'use strict';


    let stickyHeader = {}; // Object for public APIs
    let settings, wrap, header, eventTimeout;
    let last_known_scroll_position = 0;
    let ticking = false;


    let fireHeader = (scroll_pos) => {
        // scroll 위치에 대한 작업을 하세요
    }

    var eventThrottler = function () {
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
                fireHeader(last_known_scroll_position);
            ticking = false;
            });
        
            ticking = true;
        }
    };


    stickyHeader.init = function ( options ) {
        window.addEventListener( 'scroll', eventThrottler, false); 
    };

}));