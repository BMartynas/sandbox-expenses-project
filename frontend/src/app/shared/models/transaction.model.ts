import { ICategory } from './category.model';

export interface ITransaction {
  _id: string;
  accountId: string;
  title: string;
  type: string;
  category: ICategory;
  description: string;
  dateOfTransaction: Date;
  amount: number;
}
