import express from 'express';
<<<<<<< HEAD
import cors from 'cors';
import bodyParser from 'body-parser';

import usersController from './controllers/users-controller.js';
import booksController from './controllers/books-controller.js';

=======
import bodyParser from 'body-parser';
import cors from 'cors';
import booksController from '../controllers/books-controller.js';
>>>>>>> ff8675bb1179d74afe30f5845bf64cd252ac1fdc

const app = express();
const PORT = 3000;

<<<<<<< HEAD

app.use(cors(), bodyParser.json());

app.use('/books', booksController);
app.use('/users', usersController);


app.all('*', (req, res) =>
  res.status(404).send({ message: 'Resource not found!' }),
);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
=======
app.use(cors(), bodyParser.json());

app.use('/books', booksController);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
>>>>>>> ff8675bb1179d74afe30f5845bf64cd252ac1fdc
