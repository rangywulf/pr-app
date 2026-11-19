// Shared on-screen helpers used by more than one page

// show Toast message
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.remove("hidden");
    setTimeout(function () {
        toast.classList.add("hidden");
    }, 3000);
}

// Menu button opens and closes the sidebar on phones
function setUpMenuButton() {
    const button = document.getElementById("menu-button");
    const nav = document.getElementById("main-nav");
    button.addEventListener("click", function () {
        nav.classList.toggle("open");
        const isOpen = nav.classList.contains("open");
        button.setAttribute("aria-expanded", isOpen);
    });
}

setUpMenuButton();