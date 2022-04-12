import mongoose from 'mongoose';
import 'dotenv/config';
import Currency from '../models/currencies.js';
import { currencyData } from '../data/currencyData.js';

export default function connectToDB() {
  mongoose
    .connect(`${process.env.MONGO_URI}${process.env.DB_NAME}`)
    .then(() => {
      console.log('Connected to DB');
      setInitialCurrencyData();
    })
    .catch((error) => console.log(error));
}

async function setInitialCurrencyData() {
  const country = 'Lithuania';
  const data = await Currency.find({ country }).exec();
  if (data.length !== 0) {
    return;
  } else {
    await Currency.create(currencyData);
    console.log('Currency data was successfully created');
  }
}
