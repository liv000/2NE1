import * as Api from '../api.js';
const iconList = document.querySelector('.icon-list');
const tbody = document.querySelector('.table > tbody');

// 카테고리
const categories = await Api.get('/api/category/list', '');
categories.forEach((category) => {
  const { idx, categoryName, categoryImg, createdAt } = category;
  // TODO 등록일 수정
  console.log(category); // merge 전에 지울것

  // 목록 조회
  tbody.innerHTML += drawCtgList(0, categoryName, createdAt);

  // 미리보기
  iconList.innerHTML += drawCtgIcon(categoryName, categoryImg);
});

// 목록 조회
function drawCtgList(idx, categoryName, createdAt) {
  const ctgListTemplate = `
  <tr>
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
