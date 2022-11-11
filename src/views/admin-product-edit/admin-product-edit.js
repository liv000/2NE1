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
const submitButton = document.getElementById('btn-submit');
const cancelButton = document.getElementById('btn-cancel');
const deleteButton = document.getElementById('btn-delete');

// Get queryString
const { id } = getUrlParams();

// 1. 카테고리 option 목록 렌더링
const categoryList = await Api.get('/api/category/list?page=1&perPage=50', '');
const categories = categoryList.categories;

categories.forEach((category) => {
  // Variables
  const { _id, categoryName } = category;

  //
  const createOption = document.createElement('option');
  const createText = document.createTextNode(`${categoryName}`);
  createOption.setAttribute('value', `${_id}`);
  createOption.appendChild(createText);
  categotrySelectBox.appendChild(createOption);
});

// 2. 제품 목록 데이터 요청
const productDetail = await Api.get(`/api/product/`, `${id}`);
const options = categotrySelectBox.options;
const { title, thumbnail, price, stock } = productDetail;
const brandName = productDetail.brandInfo.title;
const categoryName = productDetail.category.categoryName;
const { contentImg, description } = productDetail.content;

inputProductName.value = title;
inputBrandName.value = brandName;
inputproductDescription.value = description;
inputProductUrl.value = thumbnail;
inputProductDetailUrl.value = contentImg;
inputProductStock.value = stock;
inputProductPrice.value = price;

for (let i = 0; i < options.length; i++) {
  if (options[i].text === categoryName) {
    options[i].selected = true;
  }
}

// 제품 수정하기
submitButton.addEventListener('click', onRegisterProduct);
// 취소 버튼
cancelButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (confirm('수정을 취소하겠습니까?')) history.back();
});

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

  // PATCH 요청
  const patchProduct = await Api.patch(
    `/api/product/admin/edit/${id}`,
    null,
    data,
  );

  // 제품 목록으로 페이지 이동
  if (patchProduct) {
    alert('제품 수정이 완료되었습니다.');
    window.location.href = '/admin-product';
  }
}
// 4. 제품 삭제하기
deleteButton.addEventListener('click', async (e) => {
  e.preventDefault();

  if (confirm('등록된 제품을 삭제하겠습니까?')) {
    const deleteProduct = await Api.patch('/api/product/admin/drop', `${id}`);
    if (deleteProduct) {
      alert('제품이 삭제되었습니다.');
      window.location.href = '/admin-product';
    }
  }
});
