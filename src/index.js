import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PORT } from './config.js';
import passport from 'passport';
import jwtStrategy from './auth/strategy.js';

import usersController from './controllers/users-controller.js';
import booksController from './controllers/books-controller.js';
import authController from './controllers/auth-controller.js';
import adminsController from './controllers/admins-controller.js';
import reviewsController from './controllers/reviews-controller.js';


const app = express();
passport.use(jwtStrategy);

app.use(cors());
app.use(bodyParser.json());

app.use('/books', booksController);
app.use('/users', usersController);
app.use('/auth', authController);
app.use('/admin', adminsController);
app.use('/reviews', reviewsController);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  
    res.status(500).send({
      message: 'An unexpected error occurred, our developers are working hard to resolve it.',
    });
  });
  
  app.all('*', (req, res) =>
    res.status(404).send({ message: 'Resource not found!' }),
  );
  

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
