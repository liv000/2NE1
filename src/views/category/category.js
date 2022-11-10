import * as Api from '../api.js';
import { randomId, getUrlParams } from '../useful-functions.js';

// DOM Elements
const categoryIcons = document.querySelector('.category-icons');
const allIcon = document.querySelector('#all-product');
const productItems = document.querySelector('.product-items');
const productCount = document.querySelector('.product-count');

// Global Variables
const { ctg } = getUrlParams();

// 1. 전체 아이콘
allIcon.addEventListener('click', () => {
  window.location.href = `/category?ctg=all-product`;
});

// 2. 카테고리 아이콘
const category = await Api.get('/api/category/list?page=1&perPage=20');
const categories = category.categories;

//
categories.forEach(async (category) => {
  // Variables
  const { _id, categoryName, categoryImg } = category;
  const random = randomId();

  categoryIcons.insertAdjacentHTML(
    'beforeend',
    drawCategoryIcons(random, categoryName, categoryImg),
  );

  const categoryItem = document.querySelector(`#c${random}`);
  categoryItem.addEventListener('click', () => {
    window.location.href = `/category?ctg=${_id}`;
  });
});

// 3. 제품 목록
async function addProductItemsToContainer() {
  if (ctg === 'all-product') {
    const productListAll = await Api.post(
      '/api/product/list?page=1&perPage=10',
    );

    const products = productListAll.product;

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
  } else {
    const data = { categoryId: ctg };
    const productList = await Api.post(
      '/api/product/list?page=1&perPage=10',
      data,
    );
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
}

addProductItemsToContainer();

// TODO 컴포넌트 파일 분리
function drawCategoryIcons(random, categoryName, categoryImg) {
  const iconsTemplate = `
<li id="c${random}">
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
