import * as Api from '../api.js';
import { randomId, getUrlParams } from '../useful-functions.js';

// DOM Elements
const categoryIcons = document.querySelector('.category-icons');
const allIcon = document.querySelector('#all-product');
const productItems = document.querySelector('.product-items');
const productTitle = document.querySelector('.product-title');
const pagination = document.querySelector('.pagination');

// Global Variables
const { ctg } = getUrlParams();
let count;

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
if (ctg === 'all-product') {
  const productListAll = await Api.post(`/api/product/list?page=1&perPage=12`);
  productTitle.innerText = '전체';
  addProductItemsAll();
  const { totalPage, page, perPage } = productListAll;
  drawPageButton(totalPage);
  // 페이지버튼
  pagination.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN') {
      productItems.innerHTML = '';
      count = Number(e.target.textContent);

      productItems.innerHTML += addProductItemsAll(count);
      productItems.textContent = '';
    }
  });
}

if (ctg !== 'all-product') {
  addProductItemsCategory();
}

async function addProductItemsAll(page = 1) {
  const productListAll = await Api.post(
    `/api/product/list?page=${page}&perPage=12`,
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
}

async function addProductItemsCategory(page = 1) {
  const data = { categoryId: ctg };
  const productList = await Api.post(
    `/api/product/list?page=${page}&perPage=100`,
    data,
  );
  const products = productList.product;

  products.forEach(async (product) => {
    const { _id, price, title, thumbnail } = product;
    const brandTitle = product.brandInfo.title;
    const random = randomId();
    const categoryName = product.category.categoryName;
    productTitle.innerText = categoryName;
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

function drawPageButton(totalPage) {
  for (let i = 1; i <= totalPage; i++) {
    const pageButton = `<span class="page-button">${i}</span>`;
    pagination.insertAdjacentHTML('beforeend', pageButton);
  }
}
