/*!
 * contentloaded.js
 *
 * Authors: Diego Perini (diego.perini at gmail.com)
 *          Julien Schmidt (floss at julienschmidt.com)
 * Summary: cross-browser wrapper for DOMContentLoaded
 * Updated: 2015-05-26
 * License: MIT
 * Version: 1.3
 */

/**
@function contentLoaded provides a cross-browser wrapper for DOMContentLoaded
@param {Object} window - window reference
@param {Function} fn - function to be called
*/
function contentLoaded(win, fn) {
    var done = false,
        top  = true,

        doc    = win.document,
        root   = doc.documentElement,
        modern = doc.addEventListener,

        add = modern ? 'addEventListener' : 'attachEvent',
        rem = modern ? 'removeEventListener' : 'detachEvent',
        pre = modern ? '' : 'on',

        init = function(e) {
            if (e.type === 'readystatechange' && doc.readyState !== 'complete') {
                return;
            }

            (e.type === 'load' ? win : doc)[rem](pre + e.type, init, false);

            if (!done && (done = true)) {
                fn.call(win, e.type || e);
            }
        },

        poll = function() {
            try {
                root.doScroll('left');
            } catch(e) {
                setTimeout(poll, 50);
                return;
            }
            init('poll');
        };

    if (doc.readyState === 'complete') {
        fn.call(win, 'lazy');
    } else {
        if (!modern && root.doScroll) {
            try {
                if (!win.frameElement) {
                    poll();
                }
            } catch(e) {}
        }
        doc[add](pre + 'DOMContentLoaded', init, false);
        doc[add](pre + 'readystatechange', init, false);
        win[add](pre + 'load', init, false);
    }
}
