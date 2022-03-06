import expensesService from '../services/expenses.js';

export const getAll = (req, res) => {
  const expenses = expensesService.getExpenses();
  res.json(expenses);
};

export const getOne = (req, res) => {
  const expense = expensesService.getExpense(req.params.id);
  res.json(expense);
};

export const create = (req, res) => {
  const expenses = expensesService.createExpense(req.body);
  res.status(200).json(expenses);
};

export const update = (req, res) => {
  const expenses = expensesService.updateExpense(req.params.id, req.body.title);
  res.status(200).json(expenses);
};

export const remove = (req, res) => {
  const expenses = expensesService.removeExpense(req.params.id);
  res.status(200).json(expenses);
};
