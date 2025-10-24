document.addEventListener("DOMContentLoaded", () => {
    const langBtn = document.getElementById("lang-toggle");
    const langImg = langBtn.querySelector(".languages__image img");
    const langName = langBtn.querySelector(".languages__name");
    let currentLang = localStorage.getItem("lang") || "en";

    const setLanguage = (lang) => {
        document.querySelectorAll("[data-en][data-vi]").forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        if (lang === "en") {
            langImg.src = "./assets/images/en-image.png";
            langImg.alt = "English";
            langName.textContent = "EN";
        } else {
            langImg.src = "./assets/images/vi-image.png";
            langImg.alt = "Vietnamese";
            langName.textContent = "VI";
        }

        localStorage.setItem("lang", lang);
    };

    setLanguage(currentLang);

    langBtn.addEventListener("click", () => {
        currentLang = currentLang === "en" ? "vi" : "en";
        setLanguage(currentLang);
    });
});