document.getElementById("raim-tab").addEventListener('click', () => {
    hideAll();

    document.getElementById("raim").style.display = "block";
    document.getElementById("raim-tab").setAttribute("aria-selected", true);
});

document.getElementById("beesl-tab").addEventListener('click', () => {
    hideAll();

    document.getElementById("beesl").style.display = "block";
    document.getElementById("beesl-tab").setAttribute("aria-selected", true);
});

document.getElementById("contact-tab").addEventListener('click', () => {
    hideAll();

    document.getElementById("contact").style.display = "block";
    document.getElementById("contact-tab").setAttribute("aria-selected", true);
});

document.getElementById("raim-tab").click()