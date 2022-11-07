import * as Api from '../api.js';
const iconList = document.querySelector('.icon-list');
const tbody = document.querySelector('.table > tbody');
let idx = 1;

// 카테고리
const categories = await Api.get('/api/category/list', '');
categories.forEach((category) => {
  const { categoryName, categoryImg } = category;
  let createdAt = category.createdAt.slice(0, 10);

  // 목록 조회
  tbody.innerHTML += drawCtgList(idx++, categoryName, createdAt);

  // 미리보기
  iconList.innerHTML += drawCtgIcon(categoryName, categoryImg);
});

// 목록 조회
function drawCtgList(idx, categoryName, createdAt) {
  const ctgListTemplate = `
  <tr>
    <td><input type="checkbox"></td>
    <td>${idx}</td>
    <td>${categoryName}</td>
    <td>${createdAt}</td>
    <td><button class="btn-edit">수정</button></td>
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
