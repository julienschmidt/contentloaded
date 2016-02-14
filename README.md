# contentloaded.js

contentloaded.js is a cross-browser wrapper for DOMContentLoaded.

It's like [jQuery's $(document).ready()](https://learn.jquery.com/using-jquery-core/document-ready/), but without jQuery.

DOM manipulations must be delayed until the DOM is loaded. DOMContentLoaded may not be confused with document.load, which is triggered when the full page (including external dependencies like images) is loaded.
It is therfore a good idea to initialize your javascript like this:

```js
contentLoaded(window, function(ev) {
    document.body.style.backgroundColor = 'green';
    console.log("DOM is ready!")
)
```

See also: [DOMContentLoaded - Event reference | MDN](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)