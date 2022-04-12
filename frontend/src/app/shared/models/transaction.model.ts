import { ICategory } from './category.model';

export interface ITransaction {
  _id: string;
  accountId: string;
  title: string;
  type: string;
  categories: ICategory[];
  description: string;
  dateOfTransaction: Date;
  payee?: string;
  amount: number;
}
