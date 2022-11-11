import * as Api from '../api.js';

// DOM Elements
const tbody = document.querySelector('.table > tbody');
const pagination = document.querySelector('.pagination');

// 1. 제품 목록 데이터 요청
const productList = await Api.post('/api/product/list?page=1&perPage=10');
addAdminProductList();

// Global Variable
let idx = 1;
let count;
const { totalPage, page, perPage } = productList;

function drawPageButton(totalPage) {
  for (let i = 1; i <= totalPage; i++) {
    const pageButton = `<span class="page-button">${i}</span>`;
    pagination.insertAdjacentHTML('beforeend', pageButton);
  }
}
drawPageButton(totalPage);

// 페이지버튼
pagination.addEventListener('click', async (e) => {
  if (e.target.tagName === 'SPAN') {
    tbody.innerHTML = '';
    count = Number(e.target.textContent);

    tbody.innerHTML = addAdminProductList(count);
    tbody.textContent = '';
  }
});

async function addAdminProductList(page = 1) {
  const productList = await Api.post(
    `/api/product/list?page=${page}&perPage=10`,
  );
  const products = productList.product;
  const lastIndex = Number(page * perPage);
  const firstIndex = Number(lastIndex);

  products.forEach((product, i) => {
    // Variables
    const { _id, price, stock } = product;
    const brandTitle = product.brandInfo.title;
    const { categoryName } = product.category;
    const createdAt = product.createdAt.slice(0, 10);
    const productTitle = product.title;
    const index = firstIndex + i - 9;

    //
    tbody.insertAdjacentHTML(
      'beforeend',
      drawAdminProductList(
        index,
        categoryName,
        brandTitle,
        productTitle,
        price,
        stock,
        createdAt,
        _id,
      ),
    );

    // 제품 상세페이지 이동
    const goDetailPage = document.querySelector(`#detail-${_id}`);
    goDetailPage.addEventListener('click', () => {
      window.location.href = `/detail?product=${_id}`;
    });

    // 제품 수정페이지 이동
    const editButton = document.querySelector(`#edit-${_id}`);
    editButton.addEventListener('click', () => {
      window.location.href = `/admin-product-edit?id=${_id}`;
    });
  });
}

function drawAdminProductList(
  idx,
  categoryName,
  brandTitle,
  productTitle,
  price,
  stock,
  createdAt,
  _id,
) {
  const productListTemplate = `
  <tr>
    <td>${idx}</td>
    <td>${categoryName}</td>
    <td><a id="detail-${_id}">[${brandTitle}] ${productTitle}</a></td>
    <td>${price.toLocaleString()}원</td>
    <td>${stock}개</td>
    <td>${createdAt}</td>
    <td><button id="edit-${_id}" class="btn-edit">수정</button></td>
  </tr>`;

  return productListTemplate;
}
