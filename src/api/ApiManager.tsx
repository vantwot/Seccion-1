import ApiMethods from './ApiMethods';
import ENDPOINTS from './EndPoints';

const api = new ApiMethods();
const countriesAPI = 'https://restcountries.com';

class ApiManager {
  static getAllCountries() {
    return api.get(`${countriesAPI}${ENDPOINTS.GetAllCountries()}`);
  }
}

export default ApiManager;
