// Add Books
function addBooks() {
  // Initialization Book List
  const incompletedBookself = document.getElementById(INCOMPLETE_BOOK_LIST);
  // Get Value Form
  const getTitle = document.getElementById("inputBookTitle").value;
  const getAuthor = document.getElementById("inputBookAuthor").value;
  const getYear = document.getElementById("inputBookYear").value;
  const book = createBooks(getTitle, getAuthor, getYear, false);
  // Get Value to Bookshelf
  incompletedBookself.append(book);
}

// after add book create data book to show result
function createBooks(title, author, year, isCompleted) {
  // Set Value
  const setTitle = document.createElement("h1");
  setTitle.innerText = title;
  const setAuthor = document.createElement("p");
  setAuthor.innerText = author;
  const setYear = document.createElement("p");
  setYear.innerText = year;
  // Set Text Container for Value
  const setTextContainer = document.createElement("div");
  setTextContainer.classList.add("inner");
  setTextContainer.append(setTitle, setAuthor, setYear);
  // Set Container for Value
  const setContainer = document.createElement("div");
  setContainer.classList.add("item", "shadow");
  setContainer.append(setTextContainer);
  // Set Button
  if (isCompleted) {
    setContainer.append(ButtonIncomplete(), ButtonDelete());
  } else {
    setContainer.append(ButtonCompleted());
  }
  return setContainer;
}

