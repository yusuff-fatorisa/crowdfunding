const nav = document.querySelector("[data-nav]");
const hamburger = document.querySelector("[data-hamburger]");
const closeMenu = document.querySelector("[data-close-menu]");


hamburger.addEventListener("click", () => {
	nav.classList.add("show");
	closeMenu.classList.add("show");
	hamburger.classList.add("hide");
})

closeMenu.addEventListener("click", () => {
	nav.classList.remove("show");
	closeMenu.classList.remove("show");
	hamburger.classList.remove("hide");
})