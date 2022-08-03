// VARIABLES
const books = []
// Variable Reusable
const BOOK_ITEMID = 'itemID';
const IN_PROGRESS_COUNT = 'incompleteCount';
const COMPLETED_COUNT = 'completedCount';
let NUM_COUNT_IN_PROGRESS = 0;
let NUM_COUNT_COMPLETED = 0;
// Variable for Book List
const NAME_STORAGE = "BOOKSHELF_LIST";
const INCOMPLETE_BOOKSHELF = "incompleteBookshelfList";
const COMPLETED_BOOKSHELF = "completedBookshelfList";

// FUNCTIONS
// Function for ID Unique
function setId() {
  return +new Date();
}
// Function for create value object :
// {
//   id: from setId
//   title: <string>
//   author: <string>
//   year: <number>
//   isCompleted: <boolean>
// }
function setBookObject(id, title, author, year, isCompleted) {
  return {
    id,
    title,
    author,
    year,
    isCompleted,
  };
}
// Function for find book id to show on list completed or incompleted
function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}
// Function for find book index for remove book
function findBookIndex(bookId) {
  for (const i in books) {
    if (books[i].id === bookId) {
      return i;
    }
  }
  return -1;
}
