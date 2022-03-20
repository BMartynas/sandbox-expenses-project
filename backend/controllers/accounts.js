import { StatusCodes } from 'http-status-codes';
import accountsService from '../services/accounts.js';

export const getAll = async (req, res) => {
  try {
    const accounts = await accountsService.getAccounts(req.user.id);
    res.status(StatusCodes.OK).json(accounts);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const create = async (req, res) => {
  try {
    const account = await accountsService.createAccount(req.body, req.user.id);
    res.status(StatusCodes.CREATED).json(account);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
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
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
