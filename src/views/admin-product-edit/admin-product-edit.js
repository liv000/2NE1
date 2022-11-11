import * as Api from '../api.js';
import { getUrlParams } from '../useful-functions.js';

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

// Get queryString
const { product } = getUrlParams();
console.log(product);

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
