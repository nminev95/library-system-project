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
            const query = Object.keys(req.query).join('');
            const value = Object.values(req.query).join('');  

            const { error, books } = await booksService.getAllBooks(booksData)(query, value);
      
            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'No books found!' });
            } else {
                res.status(200).send(books);
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
    .put('/:id/reviews/:id',
        authMiddleware,
        roleMiddleware('user'),
        async (req, res) => {
            const newReview = (Object.values(req.body)).toString();
            const { id } = req.params;
            const userId = req.user.id;

            const { error, review } = await booksService.updateReview(booksData)(newReview, +id, +userId);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                return res.status(404).send({ message: 'Book/review not found!' });
            }
            if (error === serviceErrors.OPERATION_NOT_PERMITTED) {
                return res.status(404).send({ message: 'Users can update only their own reviews!' });
            }
            res.status(200).send(review);
        })
    .delete('/:id/reviews/:id',
        authMiddleware,
        roleMiddleware('user'),
        async (req, res) => {
            const result = req.originalUrl.match(/[0-9]+/g);
            const bookId = result[0];
            const reviewId = result[1];
            const userId = req.user.id;

            const { error, review } = await booksService.deleteReview(booksData)(+bookId, +reviewId, +userId);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                return res.status(409).send({ message: 'Book/review not found!' });
            }
            if (error === serviceErrors.OPERATION_NOT_PERMITTED) {
                return res.status(404).send({ message: 'Users can delete only their own reviews!' });
            }
            res.status(201).send(review);

        })
    .put('/:id/rate',
        authMiddleware,
        roleMiddleware('user'),
        async (req, res) => {
            const bookId = req.params.id;
            const rating = (Object.values(req.body)).toString();
            const userId = req.user.id;

            const { error, review } = await booksService.rateBook(booksData)(+bookId, +userId, +rating);

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                return res.status(409).send({ message: 'Book not found!' });
            }

            res.status(201).send(review);

        })
    //borrow a book
    .put('/:id',
        authMiddleware,
        roleMiddleware('user'),
        async (req, res) => {
            const id = req.params.id;
            const user_Id = req.user.id;

            const bookInfo = await booksService.getBookById(booksData)(+id);
            const destrBookInfo = (Object.values(bookInfo).flat());
            const bookStatus = (destrBookInfo[1].Status);

            const { error } = await booksService.borrowABook(booksData)(user_Id, +id);


            if (bookStatus === 'Unlisted' || bookStatus === 'Borrowed') {
                return res.status(400).send({ message: 'The book is not available' });
            }

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'The books is unavailable!!' });
            } else {
                res.status(200).send({ message: 'The book is added successfully!' });
            }
        })

    //return a book 
    .post('/:id',
        authMiddleware,
        roleMiddleware('user'),
        async (req, res) => {
            const id = req.params.id;
            const user_Id = req.user.id;

            const bookInfo = await booksService.getBookById(booksData)(+id);
            const destrBookInfo = (Object.values(bookInfo).flat());
            const bookStatus = (destrBookInfo[1].Status);


            const borrowerInfo = await booksService.getBorrowerId(booksData)(+id);
            const destrBorrowerInfo = (Object.values(borrowerInfo).flat());
            const borrowerId = Number((destrBorrowerInfo[1].Borrower));
            console.log(borrowerId);

            if (bookStatus === 'Borrowed' && borrowerId !== user_Id) {
                return res.status(400).send({ message: 'The book has been borrowed by another user!' });
            }

            if (bookStatus === 'Borrowed' && borrowerId === user_Id) {
                const { error } = await booksService.returnABook(booksData)(+id);
                // eslint-disable-next-line no-unused-vars
                const sendDataToHistory = await booksService.sendInfoToUserHistory(booksData)(user_Id, +id);

                if (error === serviceErrors.RECORD_NOT_FOUND) {
                    res.status(404).send({ message: 'Book returning denied!!' });
                } else {
                    res.status(200).send('You have returned the book successfully!');
                }
            }
        });


export default booksController;
