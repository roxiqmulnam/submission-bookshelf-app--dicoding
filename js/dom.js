function addBook() {
  const getTitle = document.getElementById("inputBookTitle").value;
  const getAuthor = document.getElementById("inputBookAuthor").value;
  const getYear = document.getElementById("inputBookYear").value;
  const getStatusBook = document.getElementById("inputBookIsComplete").checked;

  document.getElementById("inputBookTitle").value = "";
  document.getElementById("inputBookAuthor").value = "";
  document.getElementById("inputBookYear").value = "";
  document.getElementById("inputBookIsComplete").checked = false;

  const book = makeBook(getTitle, getAuthor, getYear, getStatusBook);
  const bookObject = getBookObject(getTitle, getAuthor, getYear, getStatusBook);

  book[BOOK_ID] = bookObject.id;
  books.push(bookObject);

  let listID;
  if (getStatusBook) {
    listID = COMPLETE_BOOKSHELF;
    COMPLETE_COUNT++;
  } else {
    listID = INCOMPLETE_BOOKSHELF;
    INCOMPLETE_COUNT++;
  }

  const listBook = document.getElementById(listID);

  listBook.append(book);
  swal({
    title: "Book Added!",
    icon: "success",
    button: "OK",
  });
  updateCount();
  updateDataToStorage();
}

function makeBook(title, author, year, statusBook) {
  const setTitle = document.createElement("h3");
  setTitle.innerText = title;
  setTitle.classList.add("title");

  const setAuthor = document.createElement("p");
  setAuthor.innerHTML = `Author : <span class='author'>${author} </span>`;

  const setYear = document.createElement("p");
  setYear.innerHTML = `Year : <span class='year'>${year} </span>`;

  const setButtonContainer = document.createElement("div");
  setButtonContainer.classList.add("btn-wrapper");

  if (!statusBook)
    setButtonContainer.append(
      createCheckButton(),
      createEditButton(),
      createTrashButton()
    );
  else
    setButtonContainer.append(
      createUndoButton(),
      createEditButton(),
      createTrashButton()
    );

  const setContainer = document.createElement("div");
  setContainer.classList.add("book-item");

  setContainer.append(setTitle, setAuthor, setYear, setButtonContainer);
  return setContainer;
}

function refreshDataFromBooks() {
  const incompleteBookshelf = document.getElementById(INCOMPLETE_BOOKSHELF);
  const completeBookshelf = document.getElementById(COMPLETE_BOOKSHELF);

  incompleteBookshelf.innerHTML = "";
  completeBookshelf.innerHTML = "";

  COMPLETE_COUNT = 0;
  INCOMPLETE_COUNT = 0;

  for (book of books) {
    const newBook = makeBook(
      book.title,
      book.author,
      book.year,
      book.isCompleted
    );
    newBook[BOOK_ID] = book.id;

    if (book.isCompleted) {
      COMPLETE_COUNT++;
      completeBookshelf.append(newBook);
    } else {
      INCOMPLETE_COUNT++;
      incompleteBookshelf.append(newBook);
    }
  }
  updateCount();
}

function searchBook() {
  const keywords = document.getElementById("searchBookTitle").value.toLowerCase();
  const incompleteBookshelf = document.getElementById(INCOMPLETE_BOOKSHELF);
  const completeBookshelf = document.getElementById(COMPLETE_BOOKSHELF);

  incompleteBookshelf.innerHTML = "";
  completeBookshelf.innerHTML = "";

  if (keywords == "") {
    refreshDataFromBooks();
    return;
  }

  COMPLETE_COUNT = 0;
  INCOMPLETE_COUNT = 0;

  for (book of books) {
    [];
    if (book.title.toLowerCase().includes(keywords)) {
      const newBook = makeBook(
        book.title,
        book.author,
        book.year,
        book.isCompleted
      );
      newBook[BOOK_ID] = book.id;

      if (book.isCompleted) {
        COMPLETE_COUNT++;
        completeBookshelf.append(newBook);
      } else {
        INCOMPLETE_COUNT++;
        incompleteBookshelf.append(newBook);
      }
    }
  }
  updateCount();
}

function updateCount() {
  document.getElementById(INCOMPLETE_COUNT_ID).innerText = INCOMPLETE_COUNT;
  document.getElementById(COMPLETE_COUNT_ID).innerText = COMPLETE_COUNT;
}
