function hideAll () {
    document.querySelectorAll('div[role="tabpanel"]').forEach(tabpanel=>{
        tabpanel.style.display = "none";
    });

    document.querySelectorAll('.tab').forEach(tab=>{
        tab.setAttribute("aria-selected", false);
    });
}

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

document.getElementById("gallery-tab").addEventListener('click', () => {
    hideAll();

    document.getElementById("gallery").style.display = "block";
    document.getElementById("gallery-tab").setAttribute("aria-selected", true);
});

document.getElementById("welcome-tab").click()