import './css/styles.css';
import { fetchCountries } from './JS/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

Notiflix.Notify.init({
  timeout: 5000,
});

const DEBOUNCE_DELAY = 300;
const refs = {
  searchField: document.querySelector('#search-box'),
  countryListEl: document.querySelector('.country-list'),
  countryInfoEl: document.querySelector('.country-info'),
};

refs.searchField.addEventListener(
  'input',
  debounce(OnSearchBoxInput, DEBOUNCE_DELAY)
);

function OnSearchBoxInput(event) {
  event.preventDefault();
  clearCountryMarkup();
  const searchField = refs.searchField.value.trim();
  if (!searchField) return;

  fetchCountries(searchField)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.info(
          `Too many matches found. Please enter a more specific name.`
        );
      } else if (countries.length >= 2) {
        appendCountriesMarkup(countries);
      } else {
        appendCountryMarkup(countries);
      }
    })
    .catch(err => {
      Notiflix.Notify.failure(`Oops, there is no country with that name`);
    });
}

function appendCountriesMarkup(countries) {
  clearCountryMarkup();
  const markup = countries
    .map(country => {
      const {
        flags: { svg },
        name: { common: commonName },
      } = country;

      return `
          <li class ='country-list-element'>
          <img src='${svg}' alt='flag of ${commonName}' width='50' height='25'>
            <p>${commonName}</p>
          </li>
      `;
    })
    .join('');
  refs.countryListEl.innerHTML = markup;
}

function appendCountryMarkup(countries) {
  clearCountryMarkup();
  const markup = countries
    .map(country => {
      const {
        capital,
        population,
        name: { common: commonName },
        flags: { svg },
        languages,
      } = country;

      const valuesLanguages = Object.values(languages).join(', ');

      return `
           <h2 class ='country-list-element'><img src='${svg}' alt='flag of ${commonName}' width='50' height='25'>
            <p>${commonName}</p></h2>
            <p><strong>Capital:</strong> ${capital}</p>
            <p><strong>Population:</strong> ${population}</>
            <p><strong>Languages:</strong> ${valuesLanguages}</>
      `;
    })
    .join('');
  refs.countryInfoEl.innerHTML = markup;
}

function clearCountryMarkup() {
  refs.countryListEl.innerHTML = '';
  refs.countryInfoEl.innerHTML = '';
}
