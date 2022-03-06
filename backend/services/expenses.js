import mockedExpenses from '../mockData/expenses.js';

export default class ExpensesService {
  static getExpenses() {
    return mockedExpenses;
  }

  static getExpense(id) {
    const expense = mockedExpenses.find((exp) => exp.id === id);
    return expense;
  }

  static createExpense(newExpense) {
    return mockedExpenses.push(newExpense);
  }

  static updateExpense(id, newTitle) {
    const expense = mockedExpenses.find((exp) => exp.id === id);
    expense.title = newTitle;
    return expense;
  }

  static removeExpense(id) {
    return mockedExpenses.filter((exp) => exp.id != id);
  }
}
