function hideAll() {
    document.querySelectorAll('div[role="tabpanel"]').forEach(tabpanel=>{
        tabpanel.style.display = "none";
    });

    document.querySelectorAll('.tab').forEach(tab=>{
        tab.setAttribute("aria-selected", false);
    });
}