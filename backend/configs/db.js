import mongoose from 'mongoose';
import 'dotenv/config';

export default function connectToDB() {
  mongoose
    .connect(`${process.env.MONGO_URI}${process.env.DB_NAME}`)
    .then(() => console.log('Connected to DB'))
    .catch((error) => console.log(error));
}
