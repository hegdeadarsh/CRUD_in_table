document.addEventListener('DOMContentLoaded', function() {
    let rowToDelete = null; 
  
    function addRow() {
      let item = document.getElementById('item').value; 
      let quantity = document.getElementById('quantity').value; 
      let rate = document.getElementById('rate').value; 
      let amount = document.getElementById('amount').value;
  
      let quantityNum = parseFloat(quantity);
      let rateNum = parseFloat(rate);
  
      if (item && !isNaN(quantityNum) && quantityNum > 0 && !isNaN(rateNum) && rateNum > 0) {
        let newRow = document.createElement('tr');
  
        newRow.innerHTML = `
          <td><button class="btn btn-sm btn-primary edit-btn">Edit</button></td>
          <td><button class="btn btn-sm btn-danger delete-btn">Delete</button></td>
          <td></td>
          <td>${item}</td>
          <td>${quantityNum.toFixed(2)}</td>
          <td>${rateNum.toFixed(2)}</td>
          <td>${amount}</td>
        `;
        document.querySelector('table tbody').appendChild(newRow);
  
        document.getElementById('item').value = '';
        document.getElementById('quantity').value = '';
        document.getElementById('rate').value = '';
        document.getElementById('amount').value = '';
  
        updateRowIds();
      } else {
        alert('Please fill all the fields.');
      }
    }
  
    function updateRowIds() {
      const rows = document.querySelectorAll('table tbody tr');
      rows.forEach((row, index) => {
        row.querySelector('td:nth-child(3)').textContent = index + 1;
      });
    }
  
    document.getElementById('addButton').addEventListener('click', addRow);
  
    document.querySelector('table tbody').addEventListener('click', function(event) {
      if (event.target.classList.contains('edit-btn')) {
        const row = event.target.closest('tr');
        const item = row.querySelector('td:nth-child(4)').textContent;
        const quantity = row.querySelector('td:nth-child(5)').textContent;
        const rate = row.querySelector('td:nth-child(6)').textContent;
  
        document.getElementById('item').value = item;
        document.getElementById('quantity').value = quantity;
        document.getElementById('rate').value = rate;
  
        row.remove();
        updateRowIds();
      } else if (event.target.classList.contains('delete-btn')) {
        rowToDelete = event.target.closest('tr');
        $('#confirmDeleteModal').modal('show');
      }
    });
  
    document.getElementById('confirmDeleteBtn').addEventListener('click', function() {
      if (rowToDelete) {
        rowToDelete.remove();
        rowToDelete = null;
        updateRowIds();
      }
      $('#confirmDeleteModal').modal('hide');
    });
  
    function calculateAmount() {
      let quantity = parseFloat(document.getElementById('quantity').value);
      let rate = parseFloat(document.getElementById('rate').value);
      if (!isNaN(quantity) && !isNaN(rate)) {
        let amount = (quantity * rate).toFixed(2);
        document.getElementById('amount').value = amount;
      } else {
        document.getElementById('amount').value = '';
      }
    }
  
    document.getElementById('quantity').addEventListener('input', calculateAmount);
    document.getElementById('rate').addEventListener('input', calculateAmount);
  });
  