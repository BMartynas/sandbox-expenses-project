import { StatusCodes } from 'http-status-codes';
import accountsService from '../services/accounts.js';

export const getAll = (req, res) => {
  const accounts = accountsService.getAccounts();
  res.status(StatusCodes.OK).json(accounts);
};

export const getOne = (req, res) => {
  const account = accountsService.getAccount(req.params.id);
  res.status(StatusCodes.CREATED).json(account);
};

export const create = (req, res) => {
  const accounts = accountsService.createAccount(req.body);
  res.status(StatusCodes.OK).json(accounts);
};

export const update = (req, res) => {
  const accounts = accountsService.updateAccount(req.params.id, req.body.title);
  res.status(StatusCodes.OK).json(accounts);
};

export const remove = (req, res) => {
  const accounts = accountsService.removeAccount(req.params.id);
  res.status(StatusCodes.OK).json(accounts);
};
