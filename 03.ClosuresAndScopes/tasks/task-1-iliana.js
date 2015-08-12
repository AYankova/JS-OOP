function solve() {
    var library = (function () {
        var books = [];
        var categories = [];

        function isValidName(name) {
            var regex = /^[a-z0-9\.!,# ]{2,100}$/i;

            return regex.test(name);
        }

        function isValidAuthor(name) {
            return !!name.length;
        }

        function isValideISBN(ISBN) {
            var regex = /^[0-9]{10,13}$/;

            return regex.test(ISBN);
        }

        function isNotUnqueParam(book, property) {
            return books.some(function (element) {
                return book[property] === element[property];
            });
        }

        function listBooks(options) {
            var result = [];
            if (options && options.author) {
                result = books.filter(function (book) {
                    return book.author === options.author;
                });
            } else if (options && options.category) {
                result = books.filter(function (book) {
                    return book.category === options.category;
                });
            } else {
                result = books;
            }

            result = result.sort(function (firstBook, secondBook) {
                return firstBook.ID - secondBook.ID;
            });

            return result;
        }

        function addBook(book) {
            if (!isValidName(book.title) || !isValidName(book.category)) {
                throw new Error('Book title and category name must be between 2 and 100 characters, including letters, digits and special characters!');
            }
            if (!isValidAuthor(book.author)) {
                throw  new Error('Author cannot be an empty string!');
            }
            if (!isValideISBN(book.isbn)) {
                throw new Error('Books\'s ISBN should contain either 10 or 13 digits!');
            }
            if (isNotUnqueParam(book, 'title') || isNotUnqueParam(book, 'isbn')) {
                throw new Error('Book title and Book ISBN must be unique!');
            }

            book.ID = books.length + 1;
            books.push(book);

            if (categories.indexOf(book.category) === -1) {
                categories.push(book.category);
            }

            return book;
        }

        function listCategories() {
            categories = categories.sort(function (firstCategory, secondCategory) {
                return firstCategory - secondCategory;
            });
            return categories;
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