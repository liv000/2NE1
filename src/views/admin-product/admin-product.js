const tbody = document.querySelector('.table > tbody');
let number = 0;
let category = '';
let productName = '';
let title = ''; // 제조사
let price = 0;
let stock = 0;
let createdAt = '';

function productListTemplate(
  number,
  productName,
  category,
  title,
  price,
  createdAt,
) {
  return `
  <tr>
    <td>${number}</td>
    <td>${category}</td>
    <td><a href="/${'tempUrl'}"><span>[${title}]<span> ${productName}</a></td>
    <td>${price}</td>
    <td>${stock}</td>
    <td>${createdAt}</td>
    <td><button>수정</button></td>
  </tr>`;
}

// TODO 리팩토링, 비동기 공부
// 제품 목록 렌더링
fetch('./add.json')
  .then((response) => response.json())
  .then((list) => {
    list.forEach((element) => {
      number = element.index;
      category = element.category;
      productName = element.productName;
      title = element.title;
      price = element.price;
      stock = element.stock;
      createdAt = element.createdAt;

      tbody.innerHTML += productListTemplate(
        number,
        productName,
        category,
        title,
        price,
        createdAt,
      );
    });
  });
