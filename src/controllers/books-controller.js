import express from 'express';
import booksData from '../data/books-data.js';
import booksService from '../services/books-service.js';
import serviceErrors from '../services/service-errors.js';
const booksController = express.Router();

booksController
     //get all books
    .get('/', async (req, res) => {
        const { search } = req.query;
        const books = await booksService.getAllBooks(booksData)(search);

        res.status(200).json(books);
    })
    //get a book by id
    .get('/:id', async (req, res) => {
        const { id } = req.params;
        const { error, book } = await booksService.getBookById(booksData)(+id);

        if (error === serviceErrors.RECORD_NOT_FOUND) {
            res.status(404).send({ message: 'Book not found!' });
        } else {
            res.status(200).send(book);
        }
    })
    //get all the reviews of a book 
    .get('/:id/reviews', async (req, res) => {
        const { id } = req.params;
        const reviews = await booksService.getBookReviews(+id); //

        res.status(200).json(reviews);
    })
    //post a review
    .post('/:id/reviews', async (req, res) => {
        const review = Object.values(req.body).join('');
        const id = req.params.id;

        const result = await booksService.createReview(review, id);

        res.status(201).json({ message: 'Review successfully submitted!' });
    });
    //borrow a book
    // .put('/:id', async (req, res) => {
    //     const id = req.params.id;

    //     const book = await booksService.getBookById(+id);
    //     console.log(book);

    //     if (!book) {
    //         return null;
    //     }
    //     if (book.Status === 1 || book.Status === 2) {
    //         return res.status(400).send({ message: 'The book is not available' });
    //     }
    //     const updatedBook = await booksService.borrowABook(+id);

    //     if (!updatedBook) {
    //         res.status(404).send({ message: 'Book not found!' });
    //     } else {
    //         res.status(200).send(updatedBook);
    //     }
    // })
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
