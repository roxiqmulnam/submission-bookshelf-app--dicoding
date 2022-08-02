const INCOMPLETE_BOOK_LIST = "incompleteBookshelfList";
const COMPLETED_BOOK_LIST = "completedBookshelfList";

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBooks();
  });
});
