export interface ITransaction {
  _id: string;
  accountId: string;
  title: string;
  type: string;
  category: {
    _id: string;
    userId: string;
    title: string;
    type: string;
  };
  description: string;
  dateOfTransaction: Date;
  amount: number;
}
