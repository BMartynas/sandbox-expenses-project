import { Injectable } from '@angular/core';
import { ITransaction } from 'src/app/shared/models/transaction.model';
import { ICategoriesStatistics } from 'src/app/shared/interfaces/categories-statistics.interface';
import { IMonthlyStatistics } from 'src/app/shared/interfaces/monthly-statistics.interface';

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
          statistics[objIndex].totalShare = +(
            (statistics[objIndex].amount / totalExpenses) *
            100
          ).toFixed(2);
        } else {
          statistics.push({
            category: category.title,
            amount: expense.amount,
            totalShare: +((expense.amount / totalExpenses) * 100).toFixed(2),
          });
        }
      });
    }
    return statistics;
  }

  public getMonthlyStatistics(
    transactions: ITransaction[],
    start: Date,
    end: Date
  ): IMonthlyStatistics[] {
    const filteredTransactions: ITransaction[] = transactions.filter(
      (trans) =>
        this.secondDateGreater(start, trans.dateOfTransaction) &&
        this.secondDateGreater(trans.dateOfTransaction, end)
    );
    const statistics: IMonthlyStatistics[] = [];
    filteredTransactions.sort((a, b) =>
      a.dateOfTransaction > b.dateOfTransaction ? 1 : -1
    );

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const monthStats: IMonthlyStatistics = {
      date: '',
      income: 0,
      expenses: 0,
      savings: 0,
      savingsShare: 0,
    };

    let statMonth: number = 12;
    let statYear: number = 0;

    for (let transaction of filteredTransactions) {
      let date = new Date(transaction.dateOfTransaction);
      let transMonth = date.getMonth();
      let transYear = date.getFullYear();
      if (transMonth === statMonth && transYear === statYear) {
        if (transaction.type === 'income')
          monthStats.income += transaction.amount;
        else monthStats.expenses += transaction.amount;
      } else {
        if (statYear !== 0) {
          monthStats.savings = monthStats.income - monthStats.expenses;
          monthStats.savingsShare = +(
            (monthStats.savings /
              (monthStats.income === 0 ? 1 : monthStats.income)) *
            100
          ).toFixed(2);
          statistics.push({ ...monthStats });
        }
        statMonth = transMonth;
        statYear = transYear;
        monthStats.date = months[transMonth] + ' ' + transYear;
        if (transaction.type === 'income') {
          monthStats.income = transaction.amount;
          monthStats.expenses = 0;
        } else {
          monthStats.expenses = transaction.amount;
          monthStats.income = 0;
        }
      }
    }

    if (statYear !== 0) {
      monthStats.savings = monthStats.income - monthStats.expenses;
      monthStats.savingsShare = +(
        (monthStats.savings /
          (monthStats.income === 0 ? 1 : monthStats.income)) *
        100
      ).toFixed(2);
      statistics.push({ ...monthStats });
    }

    const totalIncome = statistics.reduce((acc, stat) => acc + stat.income, 0);
    const totalExpenses = statistics.reduce(
      (acc, stat) => acc + stat.expenses,
      0
    );
    if (statistics.length > 0) {
      statistics.push({
        date: 'Total',
        income: totalIncome,
        expenses: totalExpenses,
        savings: totalIncome - totalExpenses,
        savingsShare: +(
          ((totalIncome - totalExpenses) /
            (totalIncome === 0 ? 1 : totalIncome)) *
          100
        ).toFixed(2),
      });
      statistics.push({
        date: 'Average',
        income: +(totalIncome / (statistics.length - 1)).toFixed(2),
        expenses: +(totalExpenses / (statistics.length - 1)).toFixed(2),
        savings: +(
          totalIncome / (statistics.length - 1) -
          totalExpenses / (statistics.length - 1)
        ).toFixed(2),
        savingsShare: +(
          ((totalIncome / (statistics.length - 1) -
            totalExpenses / (statistics.length - 1)) /
            (totalIncome / (statistics.length - 1) === 0
              ? 1
              : totalIncome / (statistics.length - 1))) *
          100
        ).toFixed(2),
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
