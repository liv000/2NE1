import * as Api from '../api.js';

// DOM Elements
const tbody = document.querySelector('.table > tbody');
const pagination = document.querySelector('.pagination');

// 1. 카테고리 목록 데이터 요청
const categoryList = await Api.get('/api/category/list');
addAdminCategoryList();

// Global Variable
let idx = 1;
let count;
const { totalPage, page, perPage } = categoryList;

function drawPageButton(totalPage) {
  for (let i = 1; i <= totalPage; i++) {
    const pageButton = `<span class="page-button">${i}</span>`;
    pagination.insertAdjacentHTML('beforeend', pageButton);
  }
}
drawPageButton(totalPage);

// 페이지버튼
pagination.addEventListener('click', (e) => {
  if (e.target.tagName === 'SPAN') {
    tbody.innerHTML = '';
    count = Number(e.target.textContent);

    tbody.innerHTML += addAdminCategoryList(count);
    tbody.textContent = '';
  }
});

async function addAdminCategoryList(page = 1) {
  const categoryList = await Api.get(
    `/api/category/list?page=${page}&perpage=5`,
  );
  const categories = categoryList.categories;
  const lastIndex = Number(page * perPage);
  const firstIndex = Number(lastIndex);

  categories.forEach((category, i) => {
    // Variables
    const { _id, categoryName } = category;
    const createdAt = category.createdAt.slice(0, 10);
    const index = firstIndex + i - 4;

    // 불러온 데이터 렌더링
    tbody.insertAdjacentHTML(
      'beforeend',
      drawCtgList(index, _id, categoryName, createdAt),
    );

    // 카테고리 수정페이지 이동
    const editButton = document.querySelector(`#edit-${_id}`);
    editButton.addEventListener('click', () => {
      window.location.href = `/admin-category-edit?id=${_id}`;
    });
  });
}

// 목록 조회
function drawCtgList(idx, _id, categoryName, createdAt) {
  const ctgListTemplate = `
  <tr>
    <td>${idx}</td>
    <td>${categoryName}</td>
    <td>${createdAt}</td>
    <td><button id="edit-${_id}" class="btn-edit">수정</button></td>
  </tr>`;
  return ctgListTemplate;
}
