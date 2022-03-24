import { StatusCodes } from 'http-status-codes';
import transactionsService from '../services/transactions.js';
import { handleError } from '../utils/errors.js';

export const getAll = async (req, res) => {
  try {
    const transactions = await transactionsService.getTransactions(
      req.params.accountId
    );
    res.status(StatusCodes.OK).json(transactions);
  } catch (error) {
    handleError(res, error, StatusCodes.NOT_FOUND);
  }
};

export const getOne = async (req, res) => {
  try {
    const transaction = await transactionsService.getTransaction(req.params.id);
    res.status(StatusCodes.OK).json(transaction);
  } catch (error) {
    handleError(res, error, StatusCodes.NOT_FOUND);
  }
};

export const create = async (req, res) => {
  try {
    const transaction = await transactionsService.createTransaction(
      req.body,
      req.params.accountId
    );
    res.status(StatusCodes.CREATED).json(transaction);
  } catch (error) {
    handleError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const update = async (req, res) => {
  try {
    const transaction = await transactionsService.updateTransaction(
      req.params.id,
      req.body
    );
    res.status(StatusCodes.OK).json(transaction);
  } catch (error) {
    handleError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};

export const remove = async (req, res) => {
  try {
    const transaction = await transactionsService.removeTransaction(
      req.params.id
    );
    res.status(StatusCodes.OK).json(transaction);
  } catch (error) {
    handleError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
