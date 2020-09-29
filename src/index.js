import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import usersController from './controllers/users-controller.js';
import booksController from './controllers/books-controller.js';


const app = express();
const PORT = 3000;


app.use(cors(), bodyParser.json());

app.use('/books', booksController);
app.use('/users', usersController);


app.all('*', (req, res) =>
  res.status(404).send({ message: 'Resource not found!' }),
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
