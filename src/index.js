import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import booksController from '../controllers/books-controller.js';

const app = express();
const PORT = 3000;

app.use(cors(), bodyParser.json());

app.use('/books', booksController);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));