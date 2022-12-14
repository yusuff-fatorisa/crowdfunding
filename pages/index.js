const nav = document.querySelector("[data-nav]");
const hamburger = document.querySelector("[data-hamburger]");
const closeMenu = document.querySelector("[data-close-menu]");

const bookmark = document.querySelector("[data-bookmark]");
const bookmarkText = document.querySelector("[data-bookmark-text]");
const bookmarkIcon = document.querySelector("[data-bookmark-icon]");

const allPackagesDisplay = document.querySelector("[data-choose-package]");
const closePackages = document.querySelector("[data-close-all-packages]");

const allSelectRewards = document.querySelectorAll("[data-select-reward]");
const allPledgeActions = document.querySelectorAll("[data-pledge-action]");

const allLabelLinks = document.querySelectorAll("[data-input-radio]");

const allButtonContinue = document.querySelectorAll("[data-button-continue]");
const thankYou = document.querySelector("[data-thank-you]");
const thankYouCompleted = document.querySelector("[data-thank-you-completed]");

const totalBackers = document.querySelector("[data-current-backers]");
let backersValue = +totalBackers.innerText.split(",").join("");

const achievedAmount = document.querySelector("[data-amount-achieved]");
let achievedValue = +achievedAmount.innerText.split(",").join("");
const targetAmount = document.querySelector("[data-target-amount]");
let targetValue = +targetAmount.innerText.split(",").join("");

const parentProgress = document.querySelector("[data-parent-progress]");
const statusBar = document.querySelector("[data-status-bar]");

const checkAvailability = document.querySelectorAll("[data-check-availability]");


let progressValue = ((achievedValue / targetValue) * parentProgress.clientWidth);
statusBar.style.width = `${progressValue}px`;

for (let available of checkAvailability) {
	if (+available.innerText === 0) {
		available.parentElement.parentElement.parentElement.style.opacity = "0.25";
		available.parentElement.parentElement.parentElement.querySelector("button").style.backgroundColor = `var(--Dark-gray)`;
		available.parentElement.parentElement.parentElement.querySelector("button").style.cursor = "initial";
		available.parentElement.parentElement.parentElement.querySelector("button").textContent = `Out of Stock`;
		available.parentElement.parentElement.parentElement.querySelector("button").setAttribute("disabled", "");

		for (let pledgeAction of allPledgeActions) {
			if (pledgeAction.getAttribute("id") === available.parentElement.parentElement.parentElement.getAttribute("class")) {
				pledgeAction.style.opacity = "0.25";
				pledgeAction.querySelector("input").setAttribute("disabled", "");
				pledgeAction.querySelector("input").style.cursor = "initial";
				pledgeAction.querySelector("label").style.cursor = "initial";
				pledgeAction.querySelector("button").setAttribute("disabled", "");
			}
		}
	}
}

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

allSelectRewards.forEach(element => {
	element.addEventListener("click", () => {
		allPackagesDisplay.classList.add("show-flex");
		const buttonParent = element.parentElement.parentElement;
		for (let pledgeAction of allPledgeActions) {
			if (buttonParent.classList.contains(pledgeAction.getAttribute("id"))) {
				pledgeAction.querySelector("hr").classList.add("show-block");
				pledgeAction.querySelector(".below").classList.add("show-flex");
				pledgeAction.querySelector(".pledge-details .name > div > label").click();
				pledgeAction.classList.add("change-border");
			}
			else {
				pledgeAction.querySelector("hr").classList.remove("show-block");
				pledgeAction.querySelector(".below").classList.remove("show-flex");
				pledgeAction.classList.remove("change-border");
			}
		}
		closePackages.addEventListener("click", () => {
			allPackagesDisplay.classList.remove("show-flex");
		})
		allLabelLinks.forEach((labelLink) => {
			labelLink.addEventListener("click", () => {
				for (let pledgeAction of allPledgeActions) {
					if (pledgeAction.classList.contains(labelLink.getAttribute("id"))) {
						pledgeAction.querySelector("hr").classList.add("show-block");
						pledgeAction.querySelector(".below").classList.add("show-flex");
						pledgeAction.classList.add("change-border");

					}
					else {
						pledgeAction.querySelector("hr").classList.remove("show-block");
						pledgeAction.querySelector(".below").classList.remove("show-flex");
						pledgeAction.classList.remove("change-border");
					}
				}
			})
		})
	})
})


numberFormat = new Intl.NumberFormat("en-US");
allButtonContinue.forEach((buttonContinue) => {
	buttonContinue.addEventListener("click", () => {
		const donation = +buttonContinue.previousElementSibling.querySelector("input").value;
		const categoryMin = +buttonContinue.previousElementSibling.querySelector("input").getAttribute("min");
		const categoryMax = +buttonContinue.previousElementSibling.querySelector("input").getAttribute("max");
		const categoryDefault = buttonContinue.previousElementSibling.querySelector("input").getAttribute("value")
		if (donation === "") {
			alert("Enter a valid number amount");
		}
		else if (donation < categoryMin || donation > categoryMax) {
			alert(`Enter an amount from ${categoryMin} to ${categoryMax} or choose another package`);
		}
		else {
			thankYou.classList.add("show-flex");

			backersValue++;
			totalBackers.textContent = numberFormat.format(backersValue);

			achievedValue += donation
			achievedAmount.textContent = numberFormat.format(Math.floor(achievedValue));

			progressValue = ((achievedValue / targetValue) * parentProgress.clientWidth);
			statusBar.style.width = `${progressValue}px`;
			buttonContinue.previousElementSibling.querySelector("input").value = categoryDefault;

			const buttonParent = buttonContinue.parentElement.parentElement.parentElement;
			if (buttonParent.getAttribute("id") === "general") {
				return;
			}
			else {
				const sampleCounter = buttonParent.querySelector("[data-count-slots]");
				let sampleCount = +sampleCounter.innerText;
				sampleCount--;

				const allSlotCounters = buttonParent.querySelectorAll("[data-count-slots]");
				allSlotCounters.forEach((slotCounter) => {
					slotCounter.textContent = sampleCount;
				})

				checkAvailability.forEach((available) => {
					if (buttonParent.getAttribute("id") === available.parentElement.parentElement.parentElement.getAttribute("class")) {
						available.textContent = sampleCount;
					}
					if (+available.innerText === 0) {
						available.parentElement.parentElement.parentElement.style.opacity = "0.25";
						available.parentElement.parentElement.parentElement.querySelector("button").style.backgroundColor = `var(--Dark-gray)`;
						available.parentElement.parentElement.parentElement.querySelector("button").style.cursor = "initial";
						available.parentElement.parentElement.parentElement.querySelector("button").textContent = `Out of Stock`;
						available.parentElement.parentElement.parentElement.querySelector("button").setAttribute("disabled", "");

						for (let pledgeAction of allPledgeActions) {
							if (pledgeAction.getAttribute("id") === available.parentElement.parentElement.parentElement.getAttribute("class")) {
								pledgeAction.style.opacity = "0.25";
								pledgeAction.querySelector("input").setAttribute("disabled", "");
								pledgeAction.querySelector("input").style.cursor = "initial";
								pledgeAction.querySelector("label").style.cursor = "initial";
								pledgeAction.querySelector("button").setAttribute("disabled", "");
							}
						}
					}

				})
			}
		}

	})
})

thankYouCompleted.addEventListener("click", () => {
	thankYou.classList.remove("show-flex");
	allPackagesDisplay.classList.remove("show-flex");
})