import express from 'express';
import categoriesRoutes from './routes/categories.js';
import accountsRoutes from './routes/accounts.js';
import incomeRoutes from './routes/income.js';
import expensesRoutes from './routes/expenses.js';
import authRoutes from './routes/auth.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/categories', categoriesRoutes);
app.use('/accounts', accountsRoutes);
app.use('/income', incomeRoutes);
app.use('/expenses', expensesRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
