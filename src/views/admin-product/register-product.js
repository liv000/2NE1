import * as Api from '../api.js';

// DOM Elements
const inputProductName = document.getElementById('product-name');
const inputBrandName = document.getElementById('brand-name');
const inputproductDescription = document.getElementById('product-description');
const inputProductUrl = document.getElementById('product-url');
const inputProductDetailUrl = document.getElementById('product-detail-url');
const inputProductStock = document.getElementById('product-stock');
const inputProductPrice = document.getElementById('product-price');
const submit = document.getElementById('btn-submit');

// Global Variable
let data = {};

// 1. 카테고리 목록 데이터 요청하고 불러오기
// const categories = await Api.get('/api/category/list', '');

// // 2.
// categories.forEach((category) => {
//   // Variables
//   const { _id, categoryName } = category;
//   const createdAt = category.createdAt.slice(0, 10);

//   // 불러온 데이터 렌더링
//   tbody.innerHTML += drawCtgList(idx++, _id, categoryName, createdAt);
// });

// 2. 제품 등록
submit.addEventListener('click', onRegisterProduct);

async function onRegisterProduct(e) {
  e.preventDefault();
  // Input Values
  const productName = inputProductName.value;
  const brandName = inputBrandName.value;
  const productDescription = inputproductDescription.value;
  const ProductUrl = inputProductUrl.value;
  const ProductDetailUrl = inputProductDetailUrl.value;
  const ProductStock = inputProductStock.value;
  const ProductPrice = inputProductPrice.value;

  // 데이터 저장
  data = {
    title: productName,
    type: '123123',
    // brandName,
    // ProductUrl,
    summery: productDescription,
    // ProductDetailUrl,
    // ProductStock,
    price: ProductPrice,
  };

  // POST 요청
  const postProduct = await Api.post('/api/product/register', data);

  // 제품 목록으로 페이지 이동
  // window.location.href = '/admin-product';
}
