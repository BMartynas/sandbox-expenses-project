import accountsService from '../services/accounts.js';

export const getAll = (req, res) => {
  const accounts = accountsService.getAccounts();
  res.json(accounts);
};

export const getOne = (req, res) => {
  const account = accountsService.getAccount(req.params.id);
  res.json(account);
};

export const create = (req, res) => {
  const accounts = accountsService.createAccount(req.body);
  res.status(200).json(accounts);
};

export const update = (req, res) => {
  const accounts = accountsService.updateAccount(req.params.id, req.body.title);
  res.status(200).json(accounts);
};

export const remove = (req, res) => {
  const accounts = accountsService.removeAccount(req.params.id);
  res.status(200).json(accounts);
};
