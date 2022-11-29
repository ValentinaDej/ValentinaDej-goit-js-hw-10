const URL = 'https://restcountries.com/v3.1/name/';
const FIELDS = '?fields=name,capital,population,flags,languages';
export const fetchCountries = country => {
  return fetch(URL + country + FIELDS).then(result => {
    if (!result.ok) throw new Error(`HTTP error: ${result.status}`);
    return result.json();
  });
};
