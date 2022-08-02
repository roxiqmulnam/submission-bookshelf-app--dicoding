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
    addTaskToCompleted(event.target.parentElement);
  });
}
function addTaskToCompleted(book) {
  // Initialization Book List
  const listCompleted = document.getElementById(COMPLETED_BOOK_LIST);
  // Get Value Form
  const getTitle = book.querySelector(".inner > h1").innerText;
  const getAuthor = book.querySelector(".inner > p").innerText;
  const getYear = book.querySelector(".inner > p").innerText;
  const newBook = createBooks(getTitle, getAuthor, getYear, true);
  // Get Value to Bookshelf
  listCompleted.append(newBook);
  book.remove();
}
// Create Button - Undo
function ButtonIncomplete() {
  return createButton("Incomplete", "undo-button", function (event) {
    undoTaskFromCompleted(event.target.parentElement);
  });
}
function undoTaskFromCompleted(book) {
  // Initialization Book List
  const listIncomplete = document.getElementById(INCOMPLETE_BOOK_LIST);
  // Get Value Form
  const getTitle = book.querySelector(".inner > h1").innerText;
  const getAuthor = book.querySelector(".inner > p").innerText;
  const getYear = book.querySelector(".inner > p").innerText;
  const newBook = createBooks(getTitle, getAuthor, getYear, false);
  // Get Value to Bookshelf
  listIncomplete.append(newBook);
  book.remove();
}
// Create Button - Trash
function ButtonDelete() {
  return createButton("Delete", "trash-button", function (event) {
    removeTaskFromCompleted(event.target.parentElement);
  });
}
function removeTaskFromCompleted(book) {
  book.remove();
}
