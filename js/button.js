function createButton(text, buttonClass, eventListener) {
  const setButton = document.createElement("button");
  setButton.innerText = text;
  setButton.classList.add("btn");
  setButton.classList.add(buttonClass);

  setButton.addEventListener("click", function (event) {
    eventListener(event);
  });

  return setButton;
}

function createCheckButton() {
  return createButton("Finished Read", "btn-check", function (event) {
    swal({
      title: "Book has been Finished Read!",
      icon: "success",
      button: "OK",
    }).then(() => {
      addBookToCompleted(event.target.parentElement.parentElement);
    });
  });
}
function addBookToCompleted(itemBook) {
  const getTitle = itemBook.querySelector(".title").innerText;
  const getAuthor = itemBook.querySelector(".author").innerText;
  const getYear = itemBook.querySelector(".year").innerText;

  const newBook = makeBook(getTitle, getAuthor, getYear, true);

  const book = findBook(itemBook[BOOK_ID]);
  book.isCompleted = true;
  newBook[BOOK_ID] = book.id;

  const completeBookshelf = document.getElementById(COMPLETE_BOOKSHELF);
  completeBookshelf.append(newBook);
  itemBook.remove();

  COMPLETE_COUNT++;
  INCOMPLETE_COUNT--;
  updateCount();
  updateDataToStorage();
}

function createEditButton() {
  return createButton("Edit Book", "btn-edit", function (event) {
    showEditModal(event.target.parentElement.parentElement);
  });
}
function showEditModal(itemBook) {
  const book = findBook(itemBook[BOOK_ID]);

  const editModal = document.querySelector(".modal_section");
  const editID = document.querySelector("#editID");
  editID.style.display = 'none'

  document.getElementById("editID").value = itemBook[BOOK_ID];
  document.getElementById("editTitle").value = book.title;
  document.getElementById("editAuthor").value = book.author;
  document.getElementById("editYear").value = book.year;

  editModal.style.display = "block";
}

function saveEditBook() {
  const editModal = document.querySelector(".modal_section");

  const getID = document.getElementById("editID").value;
  const getTitle = document.getElementById("editTitle").value;
  const getAuthor = document.getElementById("editAuthor").value;
  const getYear = document.getElementById("editYear").value;

  const indexBook = findBookIndex(parseInt(getID));

  books[indexBook].title = getTitle;
  books[indexBook].author = getAuthor;
  books[indexBook].year = getYear;

  editModal.style.display = "none";
  refreshDataFromBooks();
  updateDataToStorage();
}

function createTrashButton() {
  return createButton("Delete Book", "btn-delete", function (event) {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        removeBookFromCompleted(event.target.parentElement.parentElement);
        swal({
          title: "Book has been deleted!",
          icon: "success",
        });
      } else {
        swal({
          title: "Book is Safe!",
          icon: "success",
        });
      }
    });
  });
}
function removeBookFromCompleted(itemBook) {
  const indexBook = findBookIndex(itemBook[BOOK_ID]);
  const statusBook = books[indexBook].isCompleted;

  if (statusBook) {
    COMPLETE_COUNT--;
  } else {
    INCOMPLETE_COUNT--;
  }

  books.splice(indexBook, 1);
  itemBook.remove();

  updateCount();
  updateDataToStorage();
}

function createUndoButton() {
  return createButton("Re-read Book", "btn-uncheck", function (event) {
    swal({
      title: "Book hasn't Complete Read!",
      icon: "info",
      button: "OK",
    }).then(() => {
      undoBookFromCompleted(event.target.parentElement.parentElement);
    });
  });
}
function undoBookFromCompleted(itemBook) {
  const getTitle = itemBook.querySelector(".title").innerText;
  const getAuthor = itemBook.querySelector(".author").innerText;
  const getYear = itemBook.querySelector(".year").innerText;

  const newBook = makeBook(getTitle, getAuthor, getYear, false);

  const book = findBook(itemBook[BOOK_ID]);
  book.isCompleted = false;
  newBook[BOOK_ID] = book.id;

  const incompleteBookshelf = document.getElementById(INCOMPLETE_BOOKSHELF);
  incompleteBookshelf.append(newBook);
  itemBook.remove();
  COMPLETE_COUNT--;
  INCOMPLETE_COUNT++;
  updateCount();
  updateDataToStorage();
}