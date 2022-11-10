import * as Api from '../api.js';

// DOM Elements
const inputProductName = document.getElementById('product-name');
const inputBrandName = document.getElementById('brand-name');
const inputproductDescription = document.getElementById('product-description');
const inputProductUrl = document.getElementById('product-url');
const inputProductDetailUrl = document.getElementById('product-detail-url');
const inputProductStock = document.getElementById('product-stock');
const inputProductPrice = document.getElementById('product-price');
const categotrySelectBox = document.getElementById('select-box');
const submit = document.getElementById('btn-submit');

// Global Variable
let data = {};

// 1. 카테고리 목록 데이터 요청하고 불러오기
const categoryList = await Api.get('/api/category/list?page=1&perPage=10', '');
const categories = categoryList.categories;
// 2.
categories.forEach((category) => {
  // Variables
  const { categoryName } = category;

  // 카테고리 추가
  const createOption = document.createElement('option');
  const createText = document.createTextNode(`${categoryName}`);
  createOption.appendChild(createText);
  categotrySelectBox.appendChild(createOption);
});

// 2. 제품 등록
submit.addEventListener('click', onRegisterProduct);

async function onRegisterProduct(e) {
  e.preventDefault();
  // Input Values
  // const productName = inputProductName.value;
  // const brandName = inputBrandName.value;
  // const categoryName = categotrySelectBox.value;
  // const productDescription = inputproductDescription.value;
  // const ProductUrl = inputProductUrl.value;
  // const ProductDetailUrl = inputProductDetailUrl.value;
  // const ProductStock = inputProductStock.value;
  // const ProductPrice = inputProductPrice.value;

  // 데이터 저장
  data = {
    title: '새로운 상품 등록 테스트',
    price: 1000,
    stock: 99,
    category: '6368b81fac3a7e698dd7879b',
  };

  // {
  //   "title" : "새로운 상품 등록 테스트",
  //   "price" : 1000,
  //   "stock" : 99,
  //   "category" : "6368b81fac3a7e698dd7879b"

  //   }

  // POST 요청
  const postProduct = await Api.post('/api/product/admin/register', data);

  // 제품 목록으로 페이지 이동
  // window.location.href = '/admin-product';
}
