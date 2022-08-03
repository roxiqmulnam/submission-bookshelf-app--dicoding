// Create Button
function createButton(textButton, classButton, eventListener) {
  const setButton = document.createElement("button");
  setButton.innerHTML = textButton;
  setButton.classList.add(classButton);
  setButton.addEventListener("click", function (event) {
    eventListener(event);
  });
  return setButton;
}
// Create Button - Check
function ButtonCompleted() {
  return createButton("Completed", "check-button", function (event) {
    addBookToCompleted(event.target.parentElement.parentElement);
  });
}
function addBookToCompleted(book) {
  // Initialization Book List
  const listCompleted = document.getElementById(COMPLETED_BOOKSHELF);
  // Get Value Form
  const getTitle = book.querySelector("h1").innerText;
  const getAuthor = book.querySelector("p").innerText;
  const getYear = book.querySelector("p").innerText;
  const newBook = makeBook(getTitle, getAuthor, getYear, true);
  // Get Value to Bookshelf
  const bookItem = findBook(book[BOOK_ITEMID]);
  bookItem.isCompleted = true;
  newBook[BOOK_ITEMID] = book.id;
  listCompleted.append(newBook);
  book.remove();

  IN_PROGRESS_COUNT++;
  COMPLETED_COUNT--;
  updateCount();
  updateDataToStorage();
  showStatusRak();
}
// Create Button - Undo
function ButtonIncomplete() {
  return createButton("Incomplete", "undo-button", function (event) {
    undoBookFromCompleted(event.target.parentElement.parentElement);
  });
}
function undoBookFromCompleted(book) {
  // Initialization Book List
  const listIncompleted = document.getElementById(INCOMPLETE_BOOKSHELF);
  // Get Value Form
  const getTitle = book.querySelector("h1").innerText;
  const getAuthor = book.querySelector("p").innerText;
  const getYear = book.querySelector("p").innerText;
  const newBook = makeBook(getTitle, getAuthor, getYear, false);
  // Get Value to Bookshelf
  const bookItem = findBook(book[BOOK_ITEMID]);
  bookItem.isCompleted = false;
  newBook[BOOK_ITEMID] = book.id;
  listIncompleted.append(newBook);
  book.remove();

  COMPLETED_COUNT--;
  IN_PROGRESS_COUNT++;
  updateCount();
  updateDataToStorage();
  showStatusRak();
}
// Create Button - Trash
function ButtonDelete() {
  return createButton("Delete", "trash-button", function (event) {
    removeBookFromCompleted(event.target.parentElement.parentElement);
  });
}
function removeBookFromCompleted(book) {
  let statusDelete = confirm("Are you sure to Delete this?");

  if (!statusDelete) return;

  const bookPosition = findBookIndex(book[BOOK_ITEMID]);
  const bookStatus = books[bookPosition].isCompleted;

  if (bookStatus) {
    COMPLETED_COUNT--;
  } else {
    IN_PROGRESS_COUNT--;
  }

  books.splice(bookPosition, 1);
  book.remove();

  updateCount();
  updateDataToStorage();
  showStatusRak();
}
// Create Button - Edit
function ButtonEdit() {
  return createButton("Edit", "edit-button", function (event) {
    editBook(event.target.parentElement.parentElement);
  });
}
function showEditModal(book) {
  const bookItem = findBook(book[BOOK_ITEMID]);
  const modalEdit = document.getElementById("modal-edit");
  document.body.classList.toggle("overflow");

  document.getElementById("edit-id").value = book[BOOK_ITEMID];
  document.getElementById("edit-judul").value = bookItem.title;
  document.getElementById("edit-penulis").value = bookItem.author;
  document.getElementById("edit-tahun").value = bookItem.year;

  modalEdit.style.display = "block";
}

function updateCount() {
  document.getElementById(COMPLETED_COUNT).innerText = NUM_COUNT_COMPLETED;
  document.getElementById(IN_PROGRESS_COUNT).innerText = NUM_COUNT_COMPLETED;
}

function showStatusRak() {
  const statusRakBelumBaca = document.querySelector(".status-rak-belumbaca");
  const statusRakSudahBaca = document.querySelector(".status-rak-sudahbaca");

  if (BELUMBACA_COUNT == 0 && statusRakBelumBaca == null) {
    const newStatusBelumBaca = document.createElement("h4");
    newStatusBelumBaca.classList.add("status-rak-belumbaca", "text-center");
    newStatusBelumBaca.innerText = "Tidak ada buku yang belum dibaca";
    document.getElementById(BELUMBACA_LIST_ID).append(newStatusBelumBaca);
  }

  if (BELUMBACA_COUNT > 0 && statusRakBelumBaca != null) {
    statusRakBelumBaca.remove();
  }

  if (SUDAHBACA_COUNT == 0 && statusRakSudahBaca == null) {
    const newStatusSudahBaca = document.createElement("h4");
    newStatusSudahBaca.classList.add("status-rak-sudahbaca", "text-center");
    newStatusSudahBaca.innerText = "Tidak ada buku yang sudah dibaca";
    document.getElementById(SUDAHBACA_LIST_ID).append(newStatusSudahBaca);
  }

  if (SUDAHBACA_COUNT > 0 && statusRakSudahBaca != null) {
    statusRakSudahBaca.remove();
  }
}

function refreshDataFromBooks() {
  const listBelumBaca = document.getElementById(BELUMBACA_LIST_ID);
  const listSudahBaca = document.getElementById(SUDAHBACA_LIST_ID);

  listBelumBaca.innerHTML = "";
  listSudahBaca.innerHTML = "";

  SUDAHBACA_COUNT = 0;
  BELUMBACA_COUNT = 0;

  for (book of books) {
    const newBook = makeBook(
      book.title,
      book.author,
      book.year,
      book.isCompleted
    );
    newBook[BOOK_ITEMID] = book.id;

    if (book.isCompleted) {
      SUDAHBACA_COUNT++;
      listSudahBaca.append(newBook);
    } else {
      BELUMBACA_COUNT++;
      listBelumBaca.append(newBook);
    }
  }
  updateCount();
  showStatusRak();
}

function searchBook() {
  const keyword = document.getElementById("input-search").value.toLowerCase();
  const listBelumBaca = document.getElementById(BELUMBACA_LIST_ID);
  let listSudahBaca = document.getElementById(SUDAHBACA_LIST_ID);

  listBelumBaca.innerHTML = "";
  listSudahBaca.innerHTML = "";

  if (keyword == "") {
    refreshDataFromBooks();
    return;
  }

  SUDAHBACA_COUNT = 0;
  BELUMBACA_COUNT = 0;

  for (book of books) {
    [];
    if (book.title.toLowerCase().includes(keyword)) {
      const newBook = makeBook(
        book.title,
        book.author,
        book.year,
        book.isCompleted
      );
      newBook[BOOK_ITEMID] = book.id;

      if (book.isCompleted) {
        SUDAHBACA_COUNT++;
        listSudahBaca.append(newBook);
      } else {
        BELUMBACA_COUNT++;
        listBelumBaca.append(newBook);
      }
    }
  }
  updateCount();
  showStatusRak();
}
