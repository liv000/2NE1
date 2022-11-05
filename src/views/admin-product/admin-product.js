const tbody = document.querySelector('.table > tbody');
let number = 0;
let category = '';
// let topCategoryTitle;
let title = '';
let price = 0;
let stock = 0;
let createdAt = '';

function displayList(number, category, price, createdAt) {
  return `
  <tr>
    <td><input type="checkbox" /></td>
    <td>${number}</td>
    <td>${category}</td>
    <td><a href="#">${price}</a></td>
    <td>${price}</td>
    <td>${stock}</td>
    <td>${createdAt}</td>
    <td><button>수정</button></td>
  </tr>`;
}
