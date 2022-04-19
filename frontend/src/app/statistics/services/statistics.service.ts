import { Injectable } from '@angular/core';
import { ITransaction } from 'src/app/shared/models/transaction.model';
import { ICategoriesStatistics } from 'src/app/shared/interfaces/categories-statistics.interface';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor() {}

  public getTotalExpenses(
    transactions: ITransaction[],
    start: Date,
    end: Date
  ): number {
    const filteredTransactions: ITransaction[] = this.filterTransactions(
      transactions,
      start,
      end
    );
    const totalExpenses = filteredTransactions.reduce(
      (acc, trans) => acc + trans.amount,
      0
    );
    return totalExpenses;
  }

  public getCategoriesStatistics(
    transactions: ITransaction[],
    start: Date,
    end: Date
  ): ICategoriesStatistics[] {
    const totalExpenses: number = this.getTotalExpenses(
      transactions,
      start,
      end
    );
    const filteredExpenses: ITransaction[] = this.filterTransactions(
      transactions,
      start,
      end
    );
    const statistics: ICategoriesStatistics[] = [];

    for (let expense of filteredExpenses) {
      expense.categories.forEach((category) => {
        if (statistics.some((stat) => stat.category === category.title)) {
          const objIndex = statistics.findIndex(
            (obj) => obj.category == category.title
          );
          statistics[objIndex].amount += expense.amount;
          statistics[objIndex].totalShare =
            (statistics[objIndex].amount / totalExpenses) * 100;
        } else {
          statistics.push({
            category: category.title,
            amount: expense.amount,
            totalShare: (expense.amount / totalExpenses) * 100,
          });
        }
      });
    }
    return statistics;
  }

  private secondDateGreater(firstDate: Date, secondDate: Date): boolean {
    return new Date(firstDate) <= new Date(secondDate);
  }

  private filterTransactions(
    transactions: ITransaction[],
    start: Date,
    end: Date
  ): ITransaction[] {
    return transactions.filter(
      (trans) =>
        trans.type === 'expenses' &&
        this.secondDateGreater(start, trans.dateOfTransaction) &&
        this.secondDateGreater(trans.dateOfTransaction, end)
    );
  }
}
