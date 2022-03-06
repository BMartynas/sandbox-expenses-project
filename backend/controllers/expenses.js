import ExpensesService from '../services/expenses.js';

export const getAll = (req, res) => {
  const expenses = ExpensesService.getExpenses();
  res.json(expenses);
};

export const getOne = (req, res) => {
  const expense = ExpensesService.getExpense(req.params.id);
  res.json(expense);
};

export const create = (req, res) => {
  const expenses = ExpensesService.createExpense(req.body);
  res.status(200).json(expenses);
};

export const update = (req, res) => {
  const expenses = ExpensesService.updateExpense(req.params.id, req.body.title);
  res.status(200).json(expenses);
};

export const remove = (req, res) => {
  const expenses = ExpensesService.removeExpense(req.params.id);
  res.status(200).json(expenses);
};
