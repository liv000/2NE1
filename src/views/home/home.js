import * as Api from '../api.js';
import { randomId } from '../useful-functions.js';

// DOM Elements
const categoryIcons = document.querySelector('.category-icons');
const productItems = document.querySelector('.product-items');

// Global Variables
let productId = '';

// 1. 카테고리 아이콘
const category = await Api.get('/api/category/list');
const categories = category.categories;

//
categories.forEach(async (category) => {
  // Variables
  const { categoryName, categoryImg } = category;

  //
  categoryIcons.innerHTML += drawCategoryIcons(categoryName, categoryImg);
});

// 2. 제품 목록
async function addProductItemsToContainer() {
  const productList = await Api.post('/api/product/list?page=1&perPage=4');
  const products = productList.product;

  products.forEach(async (product) => {
    const { _id, price, title, thumbnail } = product;
    const brandTitle = product.brandInfo.title;
    const random = randomId();

    productItems.insertAdjacentHTML(
      'beforeend',
      drawProducts(random, price, thumbnail, title, brandTitle),
    );

    const productItem = document.querySelector(`#p${random}`);
    productItem.addEventListener('click', () => {
      window.location.href = `/detail?product=${_id}`;
    });
  });
}

addProductItemsToContainer();

// TODO 컴포넌트 파일 분리
function drawCategoryIcons(categoryName, categoryImg) {
  const iconsTemplate = `
<li>
  <button class="category-link">
    <figure class="category-image is-flex">
      <img
        src="${categoryImg}"
        alt="${categoryName}"
      />
    </figure>
    <p class="category-name is-justify-content-center">${categoryName}</p>
  </button>
</li>
`;

  return iconsTemplate;
}

function drawProducts(random, price, thumbnail, title, brandTitle) {
  const productTemplate = `
  <li id="p${random}">
    <figure class="product-img">
        <img src="${thumbnail}" alt="${title}" />
      </figure>
      <div class="product-information">
        <h3>
          <span>[${brandTitle}]</span> ${title}
        </h3>
        <p class="product-price">${price.toLocaleString()}원</p>
      </div>
  </li>
    `;

  return productTemplate;
}
