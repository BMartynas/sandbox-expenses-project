import { StatusCodes } from 'http-status-codes';
import accountsService from '../services/accounts.js';
import { handleError } from '../utils/errors.js';

export const getAll = async (req, res) => {
  try {
    const accounts = await accountsService.getAccounts(req.user.id);
    res.status(StatusCodes.OK).json(accounts);
  } catch (error) {
    handleError(res, error, StatusCodes.NOT_FOUND);
  }
};

export const getOne = async (req, res) => {
  try {
    const account = await accountsService.getAccount(
      req.params.id,
      req.user.id
    );
    res.status(StatusCodes.OK).json(account);
  } catch (error) {
    handleError(res, error, StatusCodes.NOT_FOUND);
  }
};

export const getCurrency = async (req, res) => {
  try {
    const currency = await accountsService.getAccountCurrency(
      req.params.id,
      req.user.id
    );
    res.status(StatusCodes.OK).json(currency);
  } catch (error) {
    handleError(res, error, StatusCodes.NOT_FOUND);
  }
};

export const create = async (req, res) => {
  try {
    const account = await accountsService.createAccount(req.body, req.user.id);
    res.status(StatusCodes.CREATED).json(account);
  } catch (error) {
    handleError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const update = async (req, res) => {
  try {
    const account = await accountsService.updateAccount(
      req.params.id,
      req.body,
      req.user.id
    );
    res.status(StatusCodes.OK).json(account);
  } catch (error) {
    handleError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const remove = async (req, res) => {
  try {
    const account = await accountsService.removeAccount(
      req.params.id,
      req.user.id
    );
    res.status(StatusCodes.OK).json(account);
  } catch (error) {
    handleError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
