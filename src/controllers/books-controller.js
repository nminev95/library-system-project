import express from 'express';
import booksData from '../data/books-data.js';
import booksService from '../services/books-service.js';
import serviceErrors from '../services/service-errors.js';
import { authMiddleware, roleMiddleware } from '../auth/auth-middleware.js';
const booksController = express.Router();

booksController
    //get all books
    .get('/',
        authMiddleware,
        roleMiddleware('user'),
        async (req, res) => {
            console.log(req.user);
            const query = Object.keys(req.query).join('');
            const value = Object.values(req.query).join('');

            if (!req.query.author) {
                const books = await booksService.getAllBooks(booksData)(query, value);
                res.status(200).json(books);
            }
            if (!req.query.title) {
                const books = await booksService.getAllBooks(booksData)(query, value);
                res.status(200).json(books);
            }
        })
    //get a book by id
    .get('/:id',
        authMiddleware,
        roleMiddleware('user'),
        async (req, res) => {
            const { id } = req.params;
            const { error, book } = await booksService.getBookById(booksData)(+id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'Book not found!' });
            } else {
                res.status(200).send(book);
            }
        })
    //get all the reviews of a book 
    .get('/:id/reviews',
        authMiddleware,
        roleMiddleware('user'),
        async (req, res) => {
            const { id } = req.params;
            const { error, reviews } = await booksService.getBookReviews(booksData)(+id);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'Book not found or doesn\'t have reviews yet!' });
            } else {
                res.status(200).send(reviews);
            }
        })
    //post a review
    // eslint-disable-next-line no-unused-vars
    .post('/:id/reviews',
        authMiddleware,
        roleMiddleware('user'),
        async (req, res) => {
            const { id } = req.params;
            const review = req.body;
            const userId = req.user.id;

            const { error, reviews } = await booksService.createReview(booksData)(review, +id, +userId);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'Book not found or doesn\'t have reviews yet!' });
            } else {
                res.status(200).send(reviews);
            }

        })
    //borrow a book
    .put('/:id',
        authMiddleware,
        roleMiddleware('user'),
        async (req, res) => {
            const id = req.params.id;
            const user_Id = req.user.id;

            const book = await booksService.getBookById(+id);
            console.log(book);
            if (!book) {
                return null;
            }
            if (book.Status === 1 || book.Status === 2) {
                return res.status(400).send({ message: 'The book is not available' });
            }
            const updatedBook = await booksService.borrowABook(user_Id, +id);

            if (!updatedBook) {
                res.status(404).send({ message: 'Book not found!' });
            } else {
                res.status(200).send(updatedBook);
            }
        });
//return a book 
// .put('/:id', async (req, res) => {
//     const id = req.params.id;

//     const book = await booksService.getBookById(+id);
//     console.log(book);

//     if (!book) {
//         return null;
//     }
//     if (book.Status === 1 && book.Borrower === +id) {
//         const updatedBook = await booksService.returnABook(+id);

//         if (!updatedBook) {
//             res.status(404).send({ message: 'Book not found!' });
//         } else {
//             res.status(200).send(updatedBook);
//         }
//     }
// });


export default booksController;
