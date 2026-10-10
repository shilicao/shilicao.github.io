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

//scroll effect
(() => {
    const groups = document.querySelectorAll("#skills [data-reveal]");

    if (!groups.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("has-reveal");

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
        });
    }, {
        threshold: 0.30
    });

    groups.forEach((group, index) => {
        group.style.setProperty("--reveal-delay", `${index * 100}ms`);
        observer.observe(group);
    });
})();

// project section
(() => {
    const items = document.querySelectorAll("#projects [data-reveal]");
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!items.length || reduceMotion || !("IntersectionObserver" in window)) {
        return;
    }

    document.documentElement.classList.add("has-reveal");

    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.45
    });

    items.forEach((item) => observer.observe(item));
})();