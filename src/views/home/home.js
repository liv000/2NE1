import * as Api from '../api.js';
import { randomId } from '../useful-functions.js';

// DOM Elements
const categoryIcons = document.querySelector('.category-icons');
const productItems = document.querySelector('.product-items');
const allIcon = document.querySelector('#all-product');

function slider() {
  // DOM Elements
  const slideContainer = document.querySelector('.slide-container');
  const slideItems = document.querySelectorAll('.slide-item');

  // Variables
  let count = 1;

  // 슬라이드 너비
  const SLIDE_WIDTH = slideItems[0].clientWidth;
  const SLIDE_LENGHT = slideItems.length;
  const SLIDE_CONTAINER_WIDTH = SLIDE_WIDTH * SLIDE_LENGHT;
  console.log(SLIDE_CONTAINER_WIDTH);
  slideContainer.style.width = `${SLIDE_CONTAINER_WIDTH}px`;
  slideContainer.style.transform = `translateX(${-SLIDE_WIDTH * count}px`;

  // next
  setTimeout(() => {
    // 슬라이드 개수보다 큰 경우 슬라이드 방지
    if (count >= SLIDE_LENGHT - 1) return;

    // 다음 슬라이드 이동 효과
    slideContainer.classList.add('show');
    count++;
    slideContainer.style.transform = `translateX(${-SLIDE_WIDTH * count}px`;
  }, 3000);

  // 슬라이드 처음에서 마지막, 마지막에서 처음으로 이동할 때 설정
  slideContainer.addEventListener('transitionend', () => {
    // 마지막에서 처음 슬라이드로 이동
    if (slideItems[count].id === 'last') {
      slideContainer.classList.remove('show');
      // 슬라이드 이동 효과 제거
      count = SLIDE_LENGHT - 2;
      slideContainer.style.transform = `translateX(${-SLIDE_WIDTH * count}px`;
    }

    // 처음에서 마지막 슬라이드로 이동
    if (slideItems[count].id === 'first') {
      // 슬라이드 이동 효과 제거
      slideContainer.classList.remove('show');
      count = SLIDE_LENGHT - count;
      slideContainer.style.transform = `translateX(${-SLIDE_WIDTH * count}px`;
    }
  });
}

slider();

// Global Variables

// 1. 전체 아이콘
allIcon.addEventListener('click', () => {
  window.location.href = `/category?ctg=all-product`;
});

// 2. 카테고리 아이콘
const category = await Api.get('/api/category/list?page=1&perPage=10');
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

// 3. 제품목록

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
