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
(() => {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;

    const root = document.documentElement;

    function applyTheme(theme) {
        const isLight = theme === "light";

        root.dataset.theme = isLight ? "light" : "dark";
        toggle.setAttribute("aria-pressed", String(isLight));
        toggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark theme" : "Switch to light theme"
        );
    }

    const savedTheme = localStorage.getItem("theme");
    applyTheme(savedTheme === "light" ? "light" : "dark");

    toggle.addEventListener("click", () => {
        const nextTheme =
            root.dataset.theme === "light" ? "dark" : "light";

        localStorage.setItem("theme", nextTheme);
        applyTheme(nextTheme);
    });
})();