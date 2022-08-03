// ACTION FORM
document.addEventListener("DOMContentLoaded", function () {
  // Add a Book Form
  const submitForm = document.getElementById("inputBook");
  submitForm.addEventListener("submit", function (e) {
    encodeURIComponent.preventDefault();
    addBook();
  });
  // Search a Book Form
  const searchForm = document.getElementById("searchBook");
  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    searchBook();
  });
  // Edit a Book Form
  const editForm = document.getElementById("editBook");
  editForm.addEventListener("submit", function (e) {
    e.preventDefault();
    editBook();
  });
  function editBook() {
    const modalEdit = document.getElementById("modal-edit");

    const idBook = document.getElementById("edit-id").value;
    const judul = document.getElementById("edit-judul").value;
    const penulis = document.getElementById("edit-penulis").value;
    const tahun = document.getElementById("edit-tahun").value;

    const bookPosition = findBookIndex(parseInt(idBook));

    books[bookPosition].title = judul;
    books[bookPosition].author = penulis;
    books[bookPosition].year = tahun;

    refreshDataFromBooks();
    modalEdit.style.display = "none";
    document.body.classList.toggle("overflow");

    updateDataToStorage();
  }
  // Cancel to Edit Book
  document.querySelector(".btn-cancel").addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector("#modal-edit").style.display = "none";
    document.body.classList.toggle("overflow");
  });
  // Load data from local storage
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});
// REFRESH ON WEBPAGE WOULDN'T DELETE THE DATA, BECAUSE DATA SAVED FROM LOCAL STORAGE
document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});

// Add Books
function addBook() {
  // Get Value Form
  const getTitle = document.getElementById("inputBookTitle").value;
  const getAuthor = document.getElementById("inputBookAuthor").value;
  const getYear = document.getElementById("inputBookYear").value;
  const getStatusBook = document.getElementById("inputBookIsComplete").checked;
  // Validation Require Value
  if (getTitle === "" || getAuthor === "" || getYear === "") {
    alert("Please fillform correctly!");
    return;
  }

  document.getElementById("inputBookTitle").value = "";
  document.getElementById("inputBookAuthor").value = "";
  document.getElementById("inputBookYear").value = "";
  document.getElementById("inputBookIsComplete").checked = false;

  const setBook = makeBook(getTitle, getAuthor, getYear, getStatusBook);

  const bookObject = setBookObject(getTitle, getAuthor, getYear, getStatusBook);

  setBook[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  let listID;
  if (getStatusBook) {
    listID = IN_PROGRESS_COUNT;
    IN_PROGRESS_COUNT++;
  } else {
    listID = COMPLETED_COUNT;
    COMPLETED_COUNT++;
  }

  const listBook = document.getElementById(listID);

  listBook.append(book);
  updateCount();
  updateDataToStorage();
  showStatusRak();
}

// after add book create data book to show result
function makeBook(title, author, year, isCompleted) {
  // SET VALUE
  // set title
  const setTitle = document.createElement("h1");
  setTitle.innerText = title;
  // set author
  const setAuthor = document.createElement("p");
  setAuthor.innerHTML = `Author: <span>${author}</span>`;
  // set year
  const setYear = document.createElement("p");
  setYear.innerHTML = `Year: <span>${year}</span>`;
  // set container button
  const setButtonContainer = document.createElement("div");
  setButtonContainer.classList.add("btn-wrapper");
  if (!isCompleted)
    setButtonContainer.append(ButtonIncomplete(), ButtonDelete());
  else setButtonContainer.append(ButtonCompleted(), ButtonDelete());
  // set Container
  const setContainer = document.createElement("div");
  setContainer.classList.add("item");
  setContainer.append(setTitle, setAuthor, setYear, setButtonContainer);
  // return Container
  return setContainer;
}
