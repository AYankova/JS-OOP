function solve() {
    var library = (function() {
        var bookID = 0,
            categoryID = 0,
            categories = [],
            books = [];

        function listBooks(property) {
            var booksTemp = books.slice();
            if (property) {
                var prop;
                for (prop in property) {
                    if (property.hasOwnProperty(prop)) {
                        booksTemp = books.filter(function(item) {
                            return item[prop] === property[prop];
                        });
                    }
                }
            }
            books = booksTemp.slice();
            return books.sort(function(a, b) {
                return a.id - b.id;
            });
        }

        function addBook(book) {
            var newBook,
                newCategory,
                categoryIndex;
            if (books.every(function(item) {
                    return (item.title !== book.title &&
                        item.isbn !== book.isbn);
                })) {
                newBook = new Book(book);
                books.push(newBook);
            } else {
                throw 'Book titles must be unique';

            }
            if (!categories.some(function(item, index) {
                    categoryIndex = index;
                    return item.name === book.category;
                })) {
                newCategory = new Category(book.category);
                newCategory.books.push(newBook);
                categories.push(newCategory);
            } else {
                categories[categoryIndex].books.push(newBook);
            }
            return newBook;
        }

        function listCategories() {
            return categories.sort(function(a, b) {
                return a.id - b.id;
            }).map(function(item) {
                item = item.name;
                return item;
            });
        }

        function Book(book) {
            if (typeof book.title !== 'string' ||
                book.title.length < 2 ||
                book.title.length > 100) {
                throw 'Title must be 2-100 characters long string';
            }
            if (typeof book.author !== 'string' || book.author === '') {
                throw 'Author must be a non-empty string';
            }
            if (typeof book.isbn !== 'string' ||
                (book.isbn.length !== 10 &&
                    book.isbn.length !== 13) ||
                book.isbn.split().every(function(item) {
                    return isNaN(item);
                })) {
                throw 'ISBN must be a string, containing 10 or 13 digits';
            }
            this.ID = ++bookID;
            this.title = book.title;
            this.author = book.author;
            this.isbn = book.isbn;
            this.category = book.category;
        }

        function Category(name) {
            if (typeof name !== 'string' || name.length < 2 || name.length > 100) {
                throw 'Category name must be 2-100 characters long string';
            }
            this.ID = ++categoryID;
            this.name = name;
            this.books = [];
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
module
    .exports = solve;