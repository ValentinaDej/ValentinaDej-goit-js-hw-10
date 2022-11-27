import './css/styles.css';
import { CounrtyApiService } from './JS/fetchCountries';
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
const counrtyApiService = new CounrtyApiService();

refs.searchField.addEventListener(
  'input',
  debounce(OnSearchBoxInput, DEBOUNCE_DELAY)
);

function OnSearchBoxInput(event) {
  event.preventDefault();
  counrtyApiService.query = refs.searchField.value.trim();

  if (counrtyApiService.query === '') {
    return;
  }

  clearCountryMarkup();

  counrtyApiService
    .fetchCountries()
    .then(countries => {
      let searchQueryQuantity = countries.length;
      if (searchQueryQuantity > 10) {
        Notiflix.Notify.info(
          `Too many matches found. Please enter a more specific name.`
        );
      } else if (searchQueryQuantity <= 10 && searchQueryQuantity >= 2) {
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
  const markup = countries
    .map(country => {
      return `
          <li>
          <img src='${country.flags.svg}' alt='flag of ${country.name}' width='200px'>
            <p>${country.name}</p>
          </li>
      `;
    })
    .join('');
  refs.countryListEl.insertAdjacentHTML('beforeend', markup);
}

function appendCountryMarkup(countries) {
  const markup = countries
    .map(country => {
      return `
            <p>${country.name}</p>
      `;
    })
    .join('');
  refs.countryInfoEl.insertAdjacentHTML('beforeend', markup);
}

function clearCountryMarkup() {
  refs.countryInfoEl.innerHTML = '';
  refs.countryListEl.innerHTML = '';
}
