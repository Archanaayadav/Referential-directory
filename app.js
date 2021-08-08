// using ES-5 OOP  (constructors, prortotypes, methods)

// direct constructor 

function Direct(name, address, contact) {
  this.name = name;
  this.address = address;
  this.contact = contact;
}

// UI constructor
function UI() {}

// creating prototype for addList - add details to list
UI.prototype.addList = function(direct){
  console.log(direct);  // testing

  const list = document.getElementById('details');
  // create tr row element
  const row = document.createElement('tr');
  // insert cols
  row.innerHTML = `
    <td>${direct.name}</td>
    <td>${direct.address}</td>
    <td>${direct.contact}</td>
    <td><a href="#" class="delete">X<a></td>
  `;

  list.appendChild(row);

  console.log(row);
  console.log(list);
} 

// Show Alert
UI.prototype.showAlert = function(message, className){
  // Create div
  const div = document.createElement('div');
  // Add class
  div.className = `alert ${className}`;  // 2 classes added, alert, className
  // Add text
  div.appendChild(document.createTextNode(message));
  
  // insert DOM
  // Get parent
  const container = document.querySelector('.container');
  // Get form
  const form = document.querySelector('#direct-form');
  // insert alert div before form
  container.insertBefore(div, form);

  div.style.textAlign = 'center';

  // Timeout(disappear)
  setTimeout(function(){
    document.querySelector('.alert').remove()}, 3000)
}

// Delete Data - event delegation, tagetting a tag's parent(td), then targetting td's parent(tr) to remove entire row data
UI.prototype.deleteData = function(target){
  if (target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

// Clear Fields
UI.prototype.clearFields = function(){
  document.getElementById('name').value = '';
  document.getElementById('address').value = '';
  document.getElementById('contact').value = '';
}

// Event listeners for adding details
document.getElementById('direct-form').addEventListener('submit', function(e){
  console.log('submitted'); // testimg

  // Get form values
  const name = document.getElementById('name').value,
        address = document.getElementById('address').value,
        contact = document.getElementById('contact').value
  
  console.log(name, address, contact);  // testing

  // Instantiate direct
  const direct = new Direct(name, address, contact);
  console.log(direct);

  // Instantiate UI
  const ui = new UI();
  console.log(ui);  // to test that method is in prototype

  // Validate
  if(name === '' || address === '' || contact === '') {
    ui.showAlert('Please fill in all details', 'error')
  } else {
    // Add directory detials to list
    ui.addList(direct);

    //show success
    ui.showAlert('Details Added', 'success');

    // clear fields
    ui.clearFields();
  }

  e.preventDefault();
});


// Event listener for delete using event delegation
document.getElementById('details').addEventListener('click', function(e){
  // console.log('deleted');  // testing 

  // Instantiate UI
  const ui = new UI();

  // Delete data
  ui.deleteData(e.target);

  // Show message
  ui.showAlert('Data Deleted successfully','success');

  e.preventDefault();
});