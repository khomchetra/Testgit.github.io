const emailForm = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const nameError = document.getElementById("name-error");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
document.getElementById("age").addEventListener("input", validateAge);

function validateAge() {
  var ageInput = document.getElementById("age");
  var ageError = document.getElementById("age-error");
  var age = parseInt(ageInput.value);

  if (isNaN(age) || age < 1) {
    ageInput.setCustomValidity("Invalid");
    ageInput.classList.add("is-invalid");
    ageError.style.display = "block";
  } else {
    ageInput.setCustomValidity("");
    ageInput.classList.remove("is-invalid");
    ageError.style.display = "none";
  }
}
document.getElementById("addButton").addEventListener("click", function () {
  clearFormFields();
});

function clearFormFields() {
  document.getElementById("auto").value = "";
  document.getElementById("name").value = "";
  document.getElementById("gender").selectedIndex = 0;
  document.getElementById("age").value = "";
  document.getElementById("email").value = "";
  document.getElementById("province").value = "";
}

nameInput.addEventListener("input", () => {
  const containsNumbers = /\d/.test(nameInput.value);
  nameInput.setCustomValidity(containsNumbers ? "Invalid" : "");
  nameError.style.display = containsNumbers ? "block" : "none";

  const otherNameInputs = document.querySelectorAll(
    'input[type="text"]:not(#name)'
  );
  const value = nameInput.value.trim().toLowerCase();

  for (let i = 0; i < otherNameInputs.length; i++) {
    const otherNameInput = otherNameInputs[i];
    if (otherNameInput.value.trim().toLowerCase() === value) {
      nameError.style.display = "block";
      return;
    }
  }

  nameError.style.display = "none";
});

emailInput.addEventListener("input", () => {
  const value = emailInput.value.trim().toLowerCase();
  const otherEmailInputs = document.querySelectorAll(
    'input[type="email"]:not(#email)'
  );

  const isValidEmail = /^[^\s@]+@gmail\.com$/.test(value);
  emailInput.setCustomValidity(isValidEmail ? "" : "Invalid");
  emailError.style.display = isValidEmail ? "none" : "block";

  for (let i = 0; i < otherEmailInputs.length; i++) {
    const otherEmailInput = otherEmailInputs[i];
    if (otherEmailInput.value.trim().toLowerCase() === value) {
      emailError.style.display = "block";
      return;
    }
  }

  emailError.style.display = "none";
});

emailForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const enteredNames = new Set();
  const enteredEmails = new Set();

  const table = document.getElementById("studentTable");
  const rows = table
    .getElementsByTagName("tbody")[0]
    .getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    const existingName = cells[1].innerHTML.trim().toLowerCase();
    const existingEmail = cells[4].innerHTML.trim().toLowerCase();
    enteredNames.add(existingName);
    enteredEmails.add(existingEmail);
  }

  const nameValue = nameInput.value.trim().toLowerCase();
  const emailValue = emailInput.value.trim().toLowerCase();

  if (enteredNames.has(nameValue)) {
    nameError.style.display = "block";
    return;
  }

  if (enteredEmails.has(emailValue)) {
    emailError.style.display = "block";
    return;
  }

  nameError.style.display = "none";
  emailError.style.display = "none";

  addNewRow();
  emailForm.reset();
});
function addNewRow() {
  const table = document.getElementById("studentTable");
  const newRow = table.getElementsByTagName("tbody")[0].insertRow();

  const cells = [
    newRow.insertCell(0),
    newRow.insertCell(1),
    newRow.insertCell(2),
    newRow.insertCell(3),
    newRow.insertCell(4),
    newRow.insertCell(5),
    newRow.insertCell(6),
  ];

  cells[0].innerHTML = table.rows.length;
  cells[1].innerHTML = document.getElementById("name").value;
  cells[2].innerHTML = document.getElementById("gender").value;
  cells[3].innerHTML = document.getElementById("age").value;
  cells[4].innerHTML = document.getElementById("email").value;
  cells[5].innerHTML = document.getElementById("province").value;
  cells[6].innerHTML =
    "<div class='action-buttons'><button class='edit-button btn btn-primary' onclick='editRow(this)'>Edit</button> <button class='delete-button btn btn-danger' onclick='deleteRow(this)'>Delete</button></div>";

  updateRowNumbers(table);
}

function editRow(button) {
  const row = button.parentNode.parentNode.parentNode;
  const cells = row.getElementsByTagName("td");

  document.getElementById("name").value = cells[1].innerHTML;
  document.getElementById("gender").value = cells[2].innerHTML;
  document.getElementById("age").value = cells[3].innerHTML;
  document.getElementById("email").value = cells[4].innerHTML;
  document.getElementById("province").value = cells[5].innerHTML;

  row.parentNode.removeChild(row);

  const table = document.getElementById("studentTable");
  updateRowNumbers(table);
}

function deleteRow(button) {
  const row = button.parentNode.parentNode.parentNode;
  row.parentNode.removeChild(row);

  const table = document.getElementById("studentTable");
  updateRowNumbers(table);
}

function updateRowNumbers(table) {
  const rows = table
    .getElementsByTagName("tbody")[0]
    .getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName("td");
    cells[0].innerHTML = i + 1;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("hideButton").addEventListener("click", function () {
    var toggleButton = document.getElementById("hideButton");
    var studentTable = document.getElementById("studentTable");

    if (studentTable.style.display === "none") {
      studentTable.style.display = "table";
      toggleButton.textContent = "Hide";
    } else {
      studentTable.style.display = "none";
      toggleButton.textContent = "Show";
    }
  });
});
