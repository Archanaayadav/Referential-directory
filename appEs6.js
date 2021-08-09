class Direct{
  constructor(name, address, contact) {
    this.name = name;
    this.address = address;
    this.contact = contact;
  }
}

class UI{

  addList(direct) {

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

  }

  showAlert(message, className) {
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

  deleteData(target) {
    if (target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
    document.getElementById('contact').value = '';
  }
}

// Local storage  - static, to avoid instantiation of store class, use it directly
class Store{
  static getData(){
    let data;
    if(localStorage.getItem('data') === null){
       data = [];
    } else {
      data = JSON.parse(localStorage.getItem('data'));
    }

    return data;
  }

  static displayData(){
    const data = Store.getData();
    data.forEach(function(add){
      // put data into ui
      const ui = new UI();

      // Add data to ui
      ui.addList(add);
    });
  }

  static addData(add){
    const data = Store.getData();
    data.push(add);
    localStorage.setItem('data',JSON.stringify(data)); 
  }

  static removeData(contact){
    // console.log(contact);
    const data = Store.getData();
    data.forEach(function(add,index){
      if(add.contact === contact){
        data.splice(index, 1);
      }
    });
    
    localStorage.setItem('data',JSON.stringify(data)); 
  }
}

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayData);


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

    // add to local storage
    Store.addData(direct);

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

  // Remove from local storage
  Store.removeData(e.target.parentElement.previousElementSibling.textContent);   // targetting contact no

  // Show message
  ui.showAlert('Data Deleted successfully','success');

  e.preventDefault();
});