import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

Notiflix.Notify.init({
  timeout: 2000,
});

class CounrtyApiService {
  constructor() {
    this.searchQuery = '';
  }
  fetchCountries() {
    const url = `https://restcountries.com/v2/name/${this.searchQuery}`;
    console.log(url);
    //const url = 'https://restcountries.com/v2/all';
    fetch(url)
      .then(result => result.json())
      .then(data => {
        return data;
      })
      .catch(
        Notiflix.Notify.failure(`Oops, there is no country with that name`)
      );
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export { CounrtyApiService };
