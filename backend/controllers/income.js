import incomeService from '../services/income.js';

export const getAll = (req, res) => {
  const incomes = incomeService.getIncomes();
  res.json(incomes);
};

export const getOne = (req, res) => {
  const income = incomeService.getIncome(req.params.id);
  res.json(income);
};

export const create = (req, res) => {
  const incomes = incomeService.createIncome(req.body);
  res.status(200).json(incomes);
};

export const update = (req, res) => {
  const incomes = incomeService.updateIncome(req.params.id, req.body.title);
  res.status(200).json(incomes);
};

export const remove = (req, res) => {
  const incomes = incomeService.removeIncome(req.params.id);
  res.status(200).json(incomes);
};
