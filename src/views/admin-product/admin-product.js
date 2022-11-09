import * as Api from '../api.js';

// DOM Elements
const tbody = document.querySelector('.table > tbody');

// Global Variable
let idx = 1;
let productId = '';
let productTitle = '';

// 1. 제품 목록 데이터 요청
const products = await Api.post('/api/product/list');

// TODO 수정, 삭제, 페이지네이션, 필터
async function addAdminProductList() {
  products.forEach((product) => {
    if (product.category === null) return;

    // Variables
    const { _id, price, stock } = product;
    const { categoryName } = product.category;
    productTitle = product.title;
    const brandTitle = product.brandInfo.title;
    const updatedAt = product.createdAt.slice(0, 10);

    //
    tbody.insertAdjacentHTML(
      'beforeend',
      drawAdminProductList(
        idx++,
        categoryName,
        brandTitle,
        productTitle,
        price,
        stock,
        updatedAt,
        _id,
      ),
    );
  });

  //
  tbody.addEventListener('click', (e) => {
    if (e.target.tagName !== 'A') return;
    productId = e.target.id.slice(7);
    window.location.href = `/detail?product=${productId}`;
  });
}

addAdminProductList();

function drawAdminProductList(
  idx,
  categoryName,
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
    <td>${categoryName}</td>
    <td><a id="detail-${_id}">[${brandTitle}] ${productTitle}</a></td>
    <td>${price.toLocaleString()}원</td>
    <td>${stock}개</td>
    <td>${updatedAt}</td>
    <td><button id="edit-${_id}" class="btn-edit">수정</button></td>
  </tr>`;

  return productListTemplate;
}
