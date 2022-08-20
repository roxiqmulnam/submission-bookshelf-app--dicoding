const BOOK_ID = "bookID";
const COMPLETE_BOOKSHELF = "completeBookshelfList";
const INCOMPLETE_BOOKSHELF = "incompleteBookshelfList";
const INCOMPLETE_COUNT_ID = "incompleteCount";
const COMPLETE_COUNT_ID = "completeCount";
let INCOMPLETE_COUNT = 0;
let COMPLETE_COUNT = 0;

const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

document.addEventListener("DOMContentLoaded", function () {
  const inputBookForm = document.getElementById("inputBook");
  inputBookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  const searchBookForm = document.getElementById("searchBook");
  searchBookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBook();
  });

  const searchButtonReset = document.querySelector(".btn-reset");
  searchButtonReset.addEventListener("click", function (event) {
    event.preventDefault();
    refreshDataFromBooks();
    document.querySelector("#searchBookTitle").value = "";
  });

  const editBookForm = document.getElementById("editBook");
  editBookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    swal({
      title: "Book has been Edited!",
      icon: "success",
      button: "OK",
    }).then(() => {
      saveEditBook();
    });
  });
  const editBookCancel = document.querySelector(".btn-cancel");
  editBookCancel.addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(".modal_section").style.display = "none";
    document.body.classList.toggle("overflow");
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});
