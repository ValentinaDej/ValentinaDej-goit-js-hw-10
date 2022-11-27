import './css/styles.css';
import { CounrtyApiService } from './JS/fetchCountries';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchField: document.querySelector('#search-box'),
};
const counrtyApiService = new CounrtyApiService();
refs.searchField.addEventListener(
  'input',
  debounce(OnSearchBoxInpun, DEBOUNCE_DELAY)
);

function OnSearchBoxInpun(event) {
  event.preventDefault();
  console.log(refs.searchField.value);
  console.log(event.currentTarget);
  //counrtyApiService.query = event.currentTarget.elements;
  counrtyApiService.fetchCountries();
}
