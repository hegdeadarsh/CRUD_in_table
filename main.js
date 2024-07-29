document.addEventListener("DOMContentLoaded", function () {
  let rowToDelete = null;

  function addRow() {
    document.getElementById("input-row").style.display = "table-row";
    document.getElementById("saveButton").style.display = "inline-block";
    document.getElementById("cancelButton").style.display = "inline-block";
    document.getElementById("addButton").style.display = "none";
  }

  function saveRow() {
    let item = document.getElementById("item").value;
    let quantity = document.getElementById("quantity").value;
    let rate = document.getElementById("rate").value;
    let amount = document.getElementById("amount").value;

    let quantityNum = parseFloat(quantity);
    let rateNum = parseFloat(rate);

    if (item && !isNaN(quantityNum) && quantityNum > 0 && !isNaN(rateNum) && rateNum > 0) {
      let newRow = document.createElement("tr");

      newRow.innerHTML = `
        <td><button class="btn btn-sm btn-primary edit-btn">Edit</button></td>
        <td><button class="btn btn-sm btn-danger delete-btn">Delete</button></td>
        <td></td>
        <td>${item}</td>
        <td>${quantityNum.toFixed(2)}</td>
        <td>${rateNum.toFixed(2)}</td>
        <td>${amount}</td>
      `;

      document
        .querySelector("table tbody")
        .insertBefore(newRow, document.getElementById("input-row"));

      document.getElementById("item").value = "";
      document.getElementById("quantity").value = "";
      document.getElementById("rate").value = "";
      document.getElementById("amount").value = "";

      updateRowIds();
      document.getElementById("input-row").style.display = "none";
      document.getElementById("saveButton").style.display = "none";
      document.getElementById("cancelButton").style.display = "none";
      document.getElementById("addButton").style.display = "inline-block";
    } else {
      alert("Please fill all the fields.");
    }
  }

  function updateRowIds() {
    const rows = document.querySelectorAll("table tbody tr:not(#input-row)");
    rows.forEach((row, index) => {
      row.querySelector("td:nth-child(3)").textContent = index + 1;
    });
  }

  document.getElementById("cancelButton").addEventListener("click", function () {
      document.getElementById("item").value = "";
      document.getElementById("quantity").value = "";
      document.getElementById("rate").value = "";
      document.getElementById("amount").value = "";
      document.getElementById("input-row").style.display = "none";
      document.getElementById("saveButton").style.display = "none";
      document.getElementById("cancelButton").style.display = "none";
      document.getElementById("addButton").style.display = "inline-block";
    });

  document.getElementById("addButton").addEventListener("click", addRow);
  document.getElementById("saveButton").addEventListener("click", saveRow);

  document
    .querySelector("table tbody")
    .addEventListener("click", function (event) {
      if (event.target.classList.contains("edit-btn")) {
        const row = event.target.closest("tr");
        const item = row.querySelector("td:nth-child(4)").textContent;
        const quantity = row.querySelector("td:nth-child(5)").textContent;
        const rate = row.querySelector("td:nth-child(6)").textContent;
        const amount = row.querySelector("td:nth-child(7)").textContent;

        row.innerHTML = `
        <td><button class="btn btn-sm btn-primary save-edit-btn">Save</button></td>
        <td><button class="btn btn-sm btn-danger delete-btn">Delete</button></td>
        <td></td>
        <td><input type="text" value="${item}" /></td>
        <td><input type="number" step="0.01" value="${quantity}" /></td>
        <td><input type="number" step="0.01" value="${rate}" /></td>
        <td>${amount}</td>
      `;

        updateRowIds();
      } else if (event.target.classList.contains("save-edit-btn")) {
        const row = event.target.closest("tr");
        const item = row.querySelector("td:nth-child(4) input").value;
        const quantity = row.querySelector("td:nth-child(5) input").value;
        const rate = row.querySelector("td:nth-child(6) input").value;
        const amount = (parseFloat(quantity) * parseFloat(rate)).toFixed(2);

        if (item && !isNaN(parseFloat(quantity)) && parseFloat(quantity) > 0 && !isNaN(parseFloat(rate)) && parseFloat(rate) > 0) {
          row.innerHTML = `
          <td><button class="btn btn-sm btn-primary edit-btn">Edit</button></td>
          <td><button class="btn btn-sm btn-danger delete-btn">Delete</button></td>
          <td></td>
          <td>${item}</td>
          <td>${parseFloat(quantity).toFixed(2)}</td>
          <td>${parseFloat(rate).toFixed(2)}</td>
          <td>${amount}</td>
        `;

          updateRowIds();
        } else {
          alert("Please fill all the fields.");
        }
      } else if (event.target.classList.contains("delete-btn")) {
        rowToDelete = event.target.closest("tr");
        $("#confirmDeleteModal").modal("show");
      }
    });

  document
    .getElementById("confirmDeleteBtn")
    .addEventListener("click", function () {
      if (rowToDelete) {
        rowToDelete.remove();
        rowToDelete = null;
        updateRowIds();
      }
      $("#confirmDeleteModal").modal("hide");
    });

  function calculateAmount() {
    let quantity = parseFloat(document.getElementById("quantity").value);
    let rate = parseFloat(document.getElementById("rate").value);
    if (!isNaN(quantity) && !isNaN(rate)) {
      let amount = (quantity * rate).toFixed(2);
      document.getElementById("amount").value = amount;
    } else {
      document.getElementById("amount").value = "";
    }
  }

  document
    .getElementById("quantity")
    .addEventListener("input", calculateAmount);
  document.getElementById("rate").addEventListener("input", calculateAmount);
});
