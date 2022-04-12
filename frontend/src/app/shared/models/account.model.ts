import { ICurrency } from './currency.model';

export interface IAccount {
  _id: string;
  userId: string;
  name: string;
  amount: number;
  currency: ICurrency;
  description: string;
}
