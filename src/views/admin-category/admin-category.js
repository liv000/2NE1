import * as Api from '../api.js';

// DOM Elements
const iconList = document.querySelector('.icon-list');
const tbody = document.querySelector('.table > tbody');

// Global Variable
let idx = 1;
let categoryIdToEdit;

// 1. 카테고리 목록 데이터 요청하고 불러오기
const categories = await Api.get('/api/category/list', '');

// 2.
categories.forEach((category) => {
  // Variables
  const { _id, categoryName } = category;
  const createdAt = category.createdAt.slice(0, 10);

  // 불러온 데이터 렌더링
  tbody.innerHTML += drawCtgList(idx++, _id, categoryName, createdAt);
});

// TODO 이벤트 위임 맞게 했는지 질문하기
tbody.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  categoryIdToEdit = e.target.id.slice(5);
  if (e.target.id) {
    window.location.href = `/admin-category/edit-category.html?id=${categoryIdToEdit}`;
  }
});

// 목록 조회
function drawCtgList(idx, _id, categoryName, createdAt) {
  const ctgListTemplate = `
  <tr>
    <td><input type="checkbox"></td>
    <td>${idx}</td>
    <td>${categoryName}</td>
    <td>${createdAt}</td>
    <td><button id="edit-${_id}" class="btn-edit">수정</button></td>
  </tr>`;
  return ctgListTemplate;
}

// 미리보기
function drawCtgIcon(categoryName, categoryImg) {
  const iconTemplate = `
  <li>
  <button class="ctg-btn">
    <figure class="ctg-img">
      <img src="${categoryImg}" alt="아이콘이미지" />
      <p class="ctg-title">${categoryName}</p>
    </figure>
  </button>
</li>
  `;

  return iconTemplate;
}
