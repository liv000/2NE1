import * as Api from '../api.js';

// DOM Elements
const tbody = document.querySelector('.table > tbody');

// Global Variable
let idx = 1;
let categoryIdToEdit;
let categoryId = '';

// 1. 제품 목록 데이터 요청하고 불러오기
const products = await Api.post('/api/product/list');

// 2. 카테고리 목록 데이터 요청하고 불러오기
const categories = await Api.get('/api/category/list', '');
categories.forEach((category) => {
  // Variables
  console.log(category);
});

products.forEach((product) => {
  // Variables
  const { _id, price, stock, category } = product;
  const productTitle = product.title;
  const brandTitle = product.brandInfo.title;
  const updatedAt = product.createdAt.slice(0, 10);

  // 불러온 데이터 렌더링
  tbody.innerHTML += drawAdminProductList(
    idx++,
    brandTitle,
    productTitle,
    price,
    stock,
    updatedAt,
    _id,
  );
});

function drawAdminProductList(
  idx,
  brandTitle,
  productTitle,
  price,
  stock,
  updatedAt,
  _id,
) {
  const productListTemplate = `
  <tr>
    <td><input type="checkbox"></td>
    <td>${idx}</td>
    <td>${0}</td>
    <td><a href="/detail?id=${_id}"><span>[${brandTitle}]<span> ${productTitle}</a></td>
    <td>${price.toLocaleString()}원</td>
    <td>${stock}개</td>
    <td>${updatedAt}</td>
    <td><button id="edit-${_id}" class="btn-edit">수정</button></td>
  </tr>`;

  return productListTemplate;
}
