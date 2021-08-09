import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { contactsRouter } from 'routes';
import { fillDBWithFakeData } from 'models/fakeDB';
import AppError from 'utils/appError';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}
fillDBWithFakeData();
const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/contacts', contactsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

process.on('uncaughtException', (error: Error) => {
  console.log(error.name, error.message);
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  process.exit(1);
});

process.on('unhandledRejection', (error: Error) => {
  console.log(error.name, error.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  process.exit(1);
});
