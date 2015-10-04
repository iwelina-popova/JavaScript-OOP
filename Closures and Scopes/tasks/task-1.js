/* Task Description */
/* 
	*	Create a module for working with books
		*	The module must provide the following functionalities:
			*	Add a new book to category
				*	Each book has unique title, author and ISBN
				*	It must return the newly created book with assigned ID
			*	List all books
				*	Books are sorted by ID
				*	This can be done by author, by category or all
			*	Add new category
				*	Each category has a unique name 
				*	It must return the newly created category with assigned ID
			*	List all categories
				*	Categories are sorted by ID
		*	Each book/catagory has a unique identifier (ID) that is a number greater than 1
			*	When adding a book/category, the is generated automatically
		*	Add validation everywhere, where possible
			*	Book title and category name must be between 2 and 100 characters, including letters, digits and special characters ('!', ',', '.', etc)
			*	Author is any non-empty string
			*	Unique params are Book title, Category name, and Book ISBN
				* Book authors can be repeated
			*	Book ISBN is an unique code that contains either 10 or 13 digits
			*	If something is not valid - throw Error
*/

function solve() {
    var library = (function () {
        var books = [];
        var categories = [];

        function listBooks(parameter) {
            if(arguments.length > 0) {
                if(typeof parameter.category !== 'undefined') {
                    return typeof categories[parameter.category] !== 'undefined' ?
                        categories[parameter.category].books : [];
                }

                if(typeof parameter.author !== 'undefined') {

                    var booksToList = [];

                    for(var ind = 0, len = books.length; ind < len; ind += 1) {
                        if(books[ind].author === parameter.author) {
                            booksToList.push(books[ind]);
                        }
                    }

                    return booksToList;
                }
            }

            return books;
        }

        function addCategory(name) {
            categories[name] = {
                books: [],
                ID: categories.length + 2
            };
        }

        function addBook(book) {
            book.ID = books.length + 2;

            checkBookParameters(book);

            if(!checkIsUnique(book.title, 'title')) {
				throw new Error('Book with same title already exists!');
            }

            if(categories.indexOf(book.category) < 0) {
                addCategory(book.category);
            }
			
			if(!validateIsbn(book.isbn)) {
				throw new Error('The ISBN is invalid!');
			}

            validateAuthor(book.author);            
            validateCategoryAndBookName(book.title);
            validateCategoryAndBookName(book.category);

            categories[book.category].books.push(book);

            books.push(book);
            return book;
        }

        function listCategories(category) {

            var categoriesNames = [];
            Array.prototype.push.apply(categoriesNames, Object.keys(categories));

            return categoriesNames;
        }
		
		function checkBookParameters(book) {
			var bookProperties = 5;

            if(Object.keys(book).length !== bookProperties) {
                throw new Error('Some parameter is missing!');
            }

            for (var param in book) {
                if(typeof book[param] === 'undefined') {
                    throw new Error(param + 'cannot be undefined.');
                }
            }
        }		

        function checkIsUnique(name, type) {
            for(var ind = 0, len = books.length; ind < len; ind += 1) {
                if(books[ind][type] === name) {
                    return false;
                }
            }

            return true;
        }

        function validateAuthor(author) {
            if(author.trim() === '') {
                throw new Error('Please enter author!');
            }
        }

        function validateIsbn(isbn) {
			
            if(isbn.length !== 10 && isbn.length !== 13) {
               return false;
            }
			
			for(var ind = 0, len = books.length; ind < len; ind += 1) {
                if(books[ind][isbn] === isbn) {
                    return false;
                }
            }
			
			for(var i = 0, isbnLen = isbn.lenght; i <isbnLen; i += 1) {
				if(isNaN(isbn[i])) {
					return false;
				}
			}

            return true;
        }

        function validateCategoryAndBookName(name) {
            if(name.length < 2 || name.length > 100) {
                throw new Error('Name is either too short or too long');
            }
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
    } ());
    return library;
}

//solve();

//module.exports = solve;
