
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
    let settings, wrap, header, posY, endPoint;
    let last_known_scroll_position = 0;
    let ticking = false;

    var defaults = {
        selectorWrap: '[data-sticky-wrap]',
		selectorHeader: '[data-sticky-header]'
	};


    let getStickyPosition = (wrap, header) => {
       
        wrap.style.position = 'relative';
        const clientRect = header.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)
        const relativeTop = clientRect.top; // Viewport의 시작지점을 기준으로한 상대좌표 Y
        const scrolledTopLength = window.pageYOffset;
        posY = scrolledTopLength + relativeTop;

        const wrapRect = wrap.getBoundingClientRect(); // DomRect 구하기 (각종 좌표값이 들어있는 객체)
        const wrapRelativeTop = wrapRect.top; // Viewport의 시작지점을 기준으로한 상대좌표 Y
        const wrapPosY = scrolledTopLength + wrapRelativeTop;

        endPoint = wrapPosY + wrap.offsetHeight;

    };

    let fireHeader = (scroll_pos) => {
        // scroll 위치에 대한 작업을 하세요
     
        if (scroll_pos > posY && scroll_pos < endPoint){
            header.style.position = "fixed";
            header.style.top = "0px";
            header.style.bottom = "";
        } else if (scroll_pos > endPoint){
            header.style.position = "absolute";
            header.style.top = "";
            header.style.bottom = "0px";
        } else {
            header.removeAttribute('style');
        } 
        

    };

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

    //엘리먼트의 스크롤시 움직임 시작할 위치를 구해야하고
    //움직임이 멈추는 부모 엘리먼트위치 체크도 필요하다.



    stickyHeader.init = function () {
        wrap = document.querySelector(defaults.selectorWrap);
        header = document.querySelector(defaults.selectorHeader);
        getStickyPosition(wrap, header);

        console.log(posY, endPoint);

        window.addEventListener( 'scroll', eventThrottler, false); 
    };

    return stickyHeader;
}));