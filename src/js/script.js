import { fetchMusicEvents, fetchMusicEventsByKeyword, fetchMusicEventsByCountry } from "./discovery-api.js";

const keywordSearchEl = document.querySelector(".search-input");
const searchFormEl = document.querySelector(".search-form");
const countrySelectEl = document.querySelector(".country-select");

// COUNTRIEAS APPEAR
function displayCountries() { 
    let countries = fetchMusicEventsByCountry()
    console.log(countries);
}

displayEventsByCountry();
