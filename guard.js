!function () {

    function disableCopyPaste(element) {
        if (!element) return;
        element.addEventListener("mousedown", preventDefault);
        element.addEventListener("selectstart", preventDefault);
        element.addEventListener("copy", preventDefault);
        element.addEventListener("cut", preventDefault);
        element.addEventListener("paste", preventDefault);
        element.addEventListener("dragstart", preventDefault);
        element.addEventListener("drop", preventDefault);
    }

    function preventDefault(e) {
        e.preventDefault();
        return false;
    }

    function detectDevTool(allow) {
        allow = isNaN(+allow) ? 100 : +allow;
        var start = +new Date();
        alert("you need to close dev tools and you can'not use your site");
        eval("debugger");
        var end = +new Date();
        if (isNaN(start) || isNaN(end) || end - start > allow) {
            // Your code when devtools detected.
            document.body.innerHTML = '';
        }
    }

    function disableRightClick(event) {
        event.preventDefault();
    }

    function disableDevToolsShortcut(event) {
        if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'I') {
            event.preventDefault();
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        // Apply to body
        var bodyElement = document.body;
        disableCopyPaste(bodyElement);

        // Apply to input field
        var inputElement = document.querySelector("input[type='text']");
        disableCopyPaste(inputElement);
    });

    function init() {
        detectDevTool();
        window.addEventListener('resize', detectDevTool);
        window.addEventListener('mousemove', detectDevTool);
        window.addEventListener('focus', detectDevTool);
        window.addEventListener('blur', detectDevTool);
        document.addEventListener('contextmenu', disableRightClick);
        document.addEventListener('keydown', disableDevToolsShortcut);
    }

    if (window.attachEvent) {
        if (document.readyState === "complete" || document.readyState === "interactive") {
            init();
        } else {
            setTimeout(init, 0);
        }
    } else {
        window.addEventListener('load', init);
    }

}();

