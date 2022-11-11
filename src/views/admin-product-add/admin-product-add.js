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

// 1. 카테고리 요청
const categoryList = await Api.get('/api/category/list?page=1&perPage=50', '');
const categories = categoryList.categories;

categories.forEach((category) => {
  // Variables
  const { _id, categoryName } = category;

  // 카테고리 추가
  const createOption = document.createElement('option');
  const createText = document.createTextNode(`${categoryName}`);
  createOption.setAttribute('value', `${_id}`);
  createOption.appendChild(createText);
  categotrySelectBox.appendChild(createOption);
});

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
  const optionValue = categotrySelectBox.value;

  // 데이터 저장
  let data = {
    title: productName,
    category: optionValue,
    brandInfo: {
      title: brandName,
    },
    thumbnail: ProductUrl,
    content: {
      description: productDescription,
      contentImg: ProductDetailUrl,
    },
    stock: ProductStock,
    price: ProductPrice,
  };

  // POST 요청
  const postProduct = await Api.post('/api/product/admin/register', data);

  // 제품 목록으로 페이지 이동
  if (postProduct) {
    alert('제품 등록이 완료되었습니다.');
    window.location.href = '/admin-product';
  }
}
