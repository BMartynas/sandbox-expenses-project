import mockedIncome from '../mockData/income.js';

export default class IncomeService {
  static getIncomes() {
    return mockedIncome;
  }

  static getIncome(id) {
    const income = mockedIncome.find((inc) => inc.id === id);
    return income;
  }

  static createIncome(newIncome) {
    return mockedIncome.push(newIncome);
  }

  static updateIncome(id, newTitle) {
    const income = mockedIncome.find((inc) => inc.id === id);
    income.title = newTitle;
    return income;
  }

  static removeIncome(id) {
    return mockedIncome.filter((inc) => inc.id != id);
  }
}
