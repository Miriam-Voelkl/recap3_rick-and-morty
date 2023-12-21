import { onNextButtonClick, onPrevButtonClick } from "../../index.js";
import { NavPagination } from "../NavPagination/NavPagination.js";

export function NavButton() {
  const prevButton = document.createElement("button");
  prevButton.textContent = "Previous";
  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";

  nextButton.classList.add("button", "button--next");
  prevButton.classList.add("button", "button--prev");

  if (prevButton) {
    prevButton.addEventListener("click", onPrevButtonClick);
  }
  if (nextButton) {
    nextButton.addEventListener("click", onNextButtonClick);
  }
  const navigationContainer = document.querySelector('[data-js="navigation"]');

  navigationContainer.append(prevButton);
  navigationContainer.append(NavPagination());
  navigationContainer.append(nextButton);
}

NavButton();
