document.getElementById("welcome-tab").addEventListener('click', () => {
    hideAll();

    document.getElementById("welcome").style.display = "block";
    document.getElementById("welcome-tab").setAttribute("aria-selected", true);
});

document.getElementById("nav-tab").addEventListener('click', () => {
    hideAll();

    document.getElementById("navigation").style.display = "block";
    document.getElementById("nav-tab").setAttribute("aria-selected", true);
});

document.getElementById("contact-tab").addEventListener('click', () => {
    hideAll();

    document.getElementById("contact").style.display = "block";
    document.getElementById("contact-tab").setAttribute("aria-selected", true);
});

document.getElementById("welcome-tab").click()