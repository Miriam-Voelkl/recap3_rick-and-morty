import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { NavButton } from "./components/NavButton/NavButton.js";
import { NavPagination } from "./components/NavPagination/NavPagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage;
let page = 1;
let searchQuery = "";

console.log(cardContainer);

async function fetchCharacters() {
  cardContainer.innerHTML = "";
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}` //ohne "Index"!
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data:", data);

    const characterList = data.results.forEach((character) => {
      const newCard = CharacterCard(
        character.image,
        character.name,
        character.status,
        character.type,
        character.episode.length
      );
      cardContainer.append(newCard);
    });

    maxPage = data.info.pages;
    console.log("data info pages", data.info.pages);
    console.log("page number: ", page);
    pagination.innerHTML = page + " / " + maxPage;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
fetchCharacters();

// /**** Control Buttons ****/
// nextButton.addEventListener("click", () => {
//   page < maxPage ? (page += 1) : null;
//   fetchCharacters();
// });

// prevButton.addEventListener("click", () => {
//   page >= 2 ? (page -= 1) : null;
//   fetchCharacters();
// });

// search bar
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const formElements = event.target.elements;
  searchQuery = formElements.query.value;
  fetchCharacters();
});

export function onPrevButtonClick() {
  page >= 2 ? (page -= 1) : null;
  fetchCharacters();
}

export function onNextButtonClick() {
  page < maxPage ? (page += 1) : null;
  fetchCharacters();
}
