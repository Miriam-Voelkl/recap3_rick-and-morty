import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

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
const maxPage = 42;
let page = 1;
const searchQuery = "";

console.log(cardContainer);

async function fetchCharacters() {
  cardContainer.innerHTML = "";
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}` //ohne "Index"!
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data:", data.results);

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
  } catch (error) {
    console.error("Error:", error.message);
  }
  pagination.innerHTML = page + "/" + maxPage;
  console.log("page number: ", page);
}
fetchCharacters();

/**** Control Buttons ****/
nextButton.addEventListener("click", () => {
  page < maxPage ? (page += 1) : null;
  fetchCharacters();
});

prevButton.addEventListener("click", () => {
  page >= 2 ? (page -= 1) : null;
  fetchCharacters();
});
