(() => {
    const html = document.documentElement;
    const startedAt = performance.now();
    const minimumDisplayTime = 3500;
    let dismissalScheduled = false;

    function dismissLoader() {
        if (dismissalScheduled) return;
        dismissalScheduled = true;

        const elapsed = performance.now() - startedAt;
        const remaining = Math.max(0, minimumDisplayTime - elapsed);

        window.setTimeout(() => {
            html.classList.add("is-loaded");
        }, remaining);
    }

    if (document.readyState === "complete") {
        dismissLoader();
    } else {
        window.addEventListener("load", dismissLoader, { once: true });
    }

    window.setTimeout(dismissLoader, 8000);
})();