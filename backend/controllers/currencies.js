import { StatusCodes } from 'http-status-codes';
import currenciesService from '../services/currencies.js';
import { handleError } from '../utils/errors.js';

export const getAll = async (req, res) => {
  try {
    const currencies = await currenciesService.getCurrencies();
    res.status(StatusCodes.OK).json(currencies);
  } catch (error) {
    handleError(res, error, StatusCodes.INTERNAL_SERVER_ERROR);
  }
};
