const nav = document.querySelector("[data-nav]");
const hamburger = document.querySelector("[data-hamburger]");
const closeMenu = document.querySelector("[data-close-menu]");

const bookmark = document.querySelector("[data-bookmark]");
const bookmarkText = document.querySelector("[data-bookmark-text]");
const bookmarkIcon = document.querySelector("[data-bookmark-icon]");

const buttonBackProject = document.querySelector("[data-back-project]");
const allPackagesDisplay = document.querySelector("[data-choose-package]");
const closePackages = document.querySelector("[data-close-all-packages]");

const allSelectRewards = document.querySelectorAll("[data-select-reward]");
const allPledgeActions = document.querySelectorAll("[data-pledge-action]");

const allRadioButtons = document.querySelectorAll("[data-input-radio]");

const allButtonContinue = document.querySelectorAll("[data-button-continue]");
const thankYou = document.querySelector("[data-thank-you]");
const thankYouCompleted = document.querySelector("[data-thank-you-completed]");



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

bookmark.addEventListener("click", () => {
	bookmarkContent = bookmarkText.innerText;
	if (bookmarkContent !== "Bookmarked") {
		bookmarkText.textContent = "Bookmarked"
	}
	else {
		bookmarkText.textContent = `Bookmark`;
	}
	bookmarkText.classList.toggle("bookmarked-color");
	bookmarkIcon.classList.toggle("fa-bookmarked");
})

buttonBackProject.addEventListener("click", () => {
	allPackagesDisplay.classList.add("show-flex");
	allPledgeActions.forEach((elementPledgeAction) => {
		if (elementPledgeAction.getAttribute("id") === null) {
			elementPledgeAction.querySelector("hr").classList.add("show-block");
			elementPledgeAction.querySelector(".below").classList.add("show-flex");
			elementPledgeAction.querySelector(".above > .pledge-details > .name > input").setAttribute("checked", true);
			elementPledgeAction.classList.add("change-border");
		}
		else {
			elementPledgeAction.querySelector("hr").classList.remove("show-block");
			elementPledgeAction.querySelector(".below").classList.remove("show-flex");
			elementPledgeAction.querySelector(".above .pledge-details .name > input").removeAttribute("checked");
			elementPledgeAction.classList.remove("change-border");
		}
	})
})

closePackages.addEventListener("click", () => {
	allPackagesDisplay.classList.remove("show-flex");
})

allSelectRewards.forEach(element => {
	element.addEventListener("click", () => {
		allPackagesDisplay.classList.add("show-flex");
		const buttonParent = element.parentElement.parentElement.getAttribute("class");
		for (let pledgeAction of allPledgeActions) {
			if (pledgeAction.getAttribute("id") === buttonParent) {
				pledgeAction.querySelector("hr").classList.add("show-block");
				pledgeAction.querySelector(".below").classList.add("show-flex");
				pledgeAction.querySelector(".above > .pledge-details > .name > input").setAttribute("checked", true);
				pledgeAction.classList.add("change-border");
			}
			else {
				pledgeAction.querySelector("hr").classList.remove("show-block");
				pledgeAction.querySelector(".below").classList.remove("show-flex");
				pledgeAction.querySelector(".above .pledge-details .name > input").removeAttribute("checked");
				pledgeAction.classList.remove("change-border");
			}
		}
	})
})

allRadioButtons.forEach((radioButton) => {
	radioButton.addEventListener("click", () => {
		for (let pledgeAction of allPledgeActions) {
			if (pledgeAction.classList.contains(radioButton.getAttribute("id"))) {
				pledgeAction.querySelector("hr").classList.add("show-block");
				pledgeAction.querySelector(".below").classList.add("show-flex");
				pledgeAction.classList.add("change-border");
			}
			else {
				pledgeAction.querySelector("hr").classList.remove("show-block");
				pledgeAction.querySelector(".below").classList.remove("show-flex");
				pledgeAction.querySelector(".above .pledge-details .name > input").removeAttribute("checked");
				pledgeAction.classList.remove("change-border");
			}
		}
	})
})

allButtonContinue.forEach((buttonContinue) => {
	buttonContinue.addEventListener("click", () => {
		thankYou.classList.add("show-flex");
	})
})

thankYouCompleted.addEventListener("click", () => {
	thankYou.classList.remove("show-flex");
	allPackagesDisplay.classList.remove("show-flex");
})