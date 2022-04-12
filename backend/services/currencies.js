import Currency from '../models/currencies.js';

export default class CategoriesService {
  static async getCurrencies() {
    const currencies = await Currency.find();
    return currencies;
  }
}
