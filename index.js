import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { NavButton } from "./components/NavButton/NavButton.js";
import { NavPagination } from "./components/NavPagination/NavPagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States for poor people
let maxPage;
let page = 1;
let searchQuery = "";

console.log(cardContainer);

async function fetchCharacters() {
  cardContainer.innerHTML = "";
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
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

    maxPage = data.info.pages; //sets maxPage to the according value from the JSON
    console.log("data info pages", data.info.pages);
    console.log("page number: ", page);
    pagination.innerHTML = page + " / " + maxPage;
  } catch (error) {
    console.error("Error:", error.message);
  }
}
fetchCharacters();

// search bar
searchBar.addEventListener("submit", (event) => {
  event.preventDefault(); //prevents page refresh on submit
  const formElements = event.target.elements; //element contains the data of the form
  searchQuery = formElements.query.value; //we use the >value< of the inpur field
  fetchCharacters(); //fetcthes new data on refresh
});

export function onPrevButtonClick() {
  //increases page index by 1
  page >= 2 ? (page -= 1) : null;
  fetchCharacters();
}

export function onNextButtonClick() {
  //substracts by 1 if pageIndex smaller than maxPage
  page < maxPage ? (page += 1) : null;
  fetchCharacters();
}
