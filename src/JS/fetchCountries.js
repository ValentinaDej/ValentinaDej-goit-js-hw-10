class CounrtyApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    const url = `https://restcountries.com/v2/name/${this.searchQuery}?fields=name,capital,population,flags,languages`;
    return fetch(url).then(result => {
      if (!result.ok) {
        throw new Error(`HTTP error: ${result.status}`);
      }
      return result.json();
    });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export { CounrtyApiService };
