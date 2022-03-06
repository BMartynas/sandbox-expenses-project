import IncomeService from '../services/income.js';

export const getAll = (req, res) => {
  const incomes = IncomeService.getIncomes();
  res.json(incomes);
};

export const getOne = (req, res) => {
  const income = IncomeService.getIncome(req.params.id);
  res.json(income);
};

export const create = (req, res) => {
  const incomes = IncomeService.createIncome(req.body);
  res.status(200).json(incomes);
};

export const update = (req, res) => {
  const incomes = IncomeService.updateIncome(req.params.id, req.body.title);
  res.status(200).json(incomes);
};

export const remove = (req, res) => {
  const incomes = IncomeService.removeIncome(req.params.id);
  res.status(200).json(incomes);
};
