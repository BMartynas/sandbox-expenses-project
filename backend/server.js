import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import categoriesRoutes from './routes/categories.js';
import accountsRoutes from './routes/accounts.js';
import transactionsRoutes from './routes/transactions.js';
import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';
import { jwtAuth } from './auth/jwtStrategy.js';
import connectToDB from './configs/db.js';

const app = express();
const port = process.env.PORT || 3000;

connectToDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/categories', jwtAuth, categoriesRoutes);
app.use('/accounts', jwtAuth, accountsRoutes);
app.use('/transactions', jwtAuth, transactionsRoutes);
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;
