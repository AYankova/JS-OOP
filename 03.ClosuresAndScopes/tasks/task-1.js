/* Task Description */
/* 
 *  Create a module for working with books
 *  The module must provide the following functionalities:
 *  Add a new book to category
 *  Each book has unique title, author and ISBN
 *  It must return the newly created book with assigned ID
 *  If the category is missing, it must be automatically created
 *  List all books
 *  Books are sorted by ID
 *  This can be done by author, by category or all
 *  List all categories
 *  Categories are sorted by ID
 *  Each book/catagory has a unique identifier (ID) that is a number greater than or equal to 1
 *  When adding a book/category, the ID is generated automatically
 *  Add validation everywhere, where possible
 *  Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
 *  Author is any non-empty string
 *  Unique params are Book title and Book ISBN
 *  Book ISBN is an unique code that contains either 10 or 13 digits
 *  If something is not valid - throw Error
 */

function solve() {
    var library = (function() {
        var books = [];
        var categories = [];

        function listBooks() {
            var sortingByCategoryProperty,
                sortingByAuthorProperty,
                sortedBooksByCategory = [],
                sortedBooksByAuthor = [],
                args,
                len,
                i,
                j;

            args = arguments[0];
            len = books.length;

            if (arguments.length) {
                if (args.category) {
                    sortingByCategoryProperty = args.category;

                    for (i = 0; i < len; i += 1) {
                        if (books[i].category === sortingByCategoryProperty) {
                            sortedBooksByCategory.push(books[i]);
                        }
                    }

                    books = sortedBooksByCategory.slice();
                }

                if (args.author) {
                    sortingByAuthorProperty = args.author;

                    for (j = 0; j < len; j += 1) {
                        if (books[j].author === sortingByAuthorProperty) {
                            sortedBooksByAuthor.push(books[j]);
                        }
                    }

                    books = sortedBooksByAuthor.slice();
                }
            }

            books = books.sort(function(a, b) {
                return a.id - b.id;
            });

            return books.slice();
        }

        function isNotUnqueParam(book, property) {
            return books.some(function(element) {
                return book[property] === element[property];
            });
        }

        function addBook(book) {
            var i,
                indexCategory,
                existTitle = false,
                existISBN = false;

            book.ID = books.length + 1;

            if (!(arguments.length)) {
                throw new Error('Invalid argument book!');
            }

            if (book.title.length < 2 || book.title.length > 100 || book.category.length < 2 || book.category.length > 100) {
                throw new Error('Book titles and categories must be between 2 and 100 characters inclusive!');
            }

            if (book.author === "" && typeof book.author !== 'string') {
                throw new Error("Author can't be an empty string!");
            }

            if ((book.isbn.length !== 10 && book.isbn.length !== 13) || !(/^\d+$/.test(book.isbn))) {
                throw new Error('Book ISBN must be either 10 or 13 digits!');
            }

            for (i = 0; i < books.length; i += 1) {
                if (books[i].title === book.title) {
                    existTitle = true;
                }

                if (books[i].isbn === book.isbn) {
                    existISBN = true;
                }
            }

            if (existTitle) {
                throw new Error('Existing title in the library!');
            }

            if (existISBN) {
                throw new Error('Existing ISBN in the library!');
            }

            books.push(book);

            indexCategory = categories.indexOf(book.category);

            if (indexCategory >= 0) {
                book.category = categories[indexCategory];
            } else {
                categories.ID = categories.length + 1;
                categories.push(book.category);
            }

            return book;
        }

        function listCategories() {
            categories.sort(function(a, b) {
                return a.ID - b.ID;
            });

            return categories.slice();
        }

        return {
            books: {
                list: listBooks,
                add: addBook
            },
            categories: {
                list: listCategories
            }
        };
    }());

    return library;
}

module.exports = solve;
