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

// Theme button
(() => {
    const root = document.documentElement;
    const button = document.getElementById("themeButton");

    if (!button) return;

    function applyTheme(theme) {
        const isLight = theme === "light";

        root.dataset.theme = isLight ? "light" : "dark";
        button.setAttribute("aria-pressed", String(isLight));
        button.setAttribute(
            "aria-label",
            isLight ? "Switch to dark theme" : "Switch to light theme"
        );
    }

    const savedTheme = localStorage.getItem("theme");
    applyTheme(savedTheme === "light" ? "light" : "dark");

    button.addEventListener("click", () => {
        const nextTheme =
            root.dataset.theme === "dark" ? "light" : "dark";

        localStorage.setItem("theme", nextTheme);
        applyTheme(nextTheme);
    });
})();
