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

<<<<<<< HEAD
        })
    //borrow a book
    .put('/:id',
=======
                if (error === serviceErrors.RECORD_NOT_FOUND) {
                    res.status(404).send({ message: 'Book not found or doesn\'t have reviews yet!' });
                } else {
                    res.status(200).send(reviews);
                }
            };
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


            if (bookStatus === 'unlisted' || bookStatus === 'borrowed') {
                return res.status(400).send({ message: 'The book is not available' });
            }

            if (error === serviceErrors.RECORD_NOT_FOUND) {
                res.status(404).send({ message: 'The books is unavailable!!' });
            } else {
                res.status(200).send({message: 'The book is added successfully!'});
            }
        })
    //return a book 

    .delete('/:id',
>>>>>>> cce02cf7c9994004a83aece7f4f8302b1424fe22
        authMiddleware,
        roleMiddleware('user'),
        async (req, res) => {
            const id = req.params.id;
            const user_Id = req.user.id;

<<<<<<< HEAD
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
=======
            const bookInfo = await booksService.getBookById(booksData)(+id);
            const destrBookInfo = (Object.values(bookInfo).flat());
            const bookStatus = (destrBookInfo[1].Status);

            const borrowerInfo = await booksService.getBorrowerId(booksData)(+id);
            const destrBorrowerInfo = (Object.values(borrowerInfo).flat());
            const borrowerId = (destrBorrowerInfo[1].Borrower);
           

            if (bookStatus === 5 || borrowerId !== user_Id) {
                return res.status(400).send({ message: 'The book has been borrowed by another user!' });
            }

            if (bookStatus === 'borrowed' && borrowerId === user_Id) {
                const { error, returnedBook } = await booksService.returnABook(booksData)(+id);

                if (error === serviceErrors.RECORD_NOT_FOUND) {
                    res.status(404).send({ message: 'The books is unavailable!!' });
                } else {
                    res.status(200).send(returnedBook);
                }
            }
        });
>>>>>>> cce02cf7c9994004a83aece7f4f8302b1424fe22


export default booksController;
