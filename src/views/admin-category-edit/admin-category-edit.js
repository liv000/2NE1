import * as Api from '../api.js';

// DOM Elements
const inputCategoryName = document.getElementById('category-name');
const inputCategoryCode = document.getElementById('category-code');
const inputCategoryImg = document.getElementById('category-url');
const submitButton = document.getElementById('btn-submit');
const cancelButton = document.getElementById('btn-cancel');
const deleteButton = document.getElementById('btn-delete');

// Get queryString
let queryStringId = new URLSearchParams(window.location.search).get('id');
let categoryCode = '';

//  1. 카테고리 option 목록 렌더링
const category = await Api.get('/api/category/list?page=1&perPage=10', '');
const categories = category.categories;

for (let category of categories) {
  if (queryStringId !== category._id) continue;
  inputCategoryName.value = category.categoryName;
  inputCategoryCode.value = category.categoryCode;
  inputCategoryImg.value = category.categoryImg;
  categoryCode = category.categoryCode;
}

// 2. 카테고리 수정하기
submitButton.addEventListener('click', onRegisterCategory);
// 취소 버튼
cancelButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (confirm('수정을 취소하겠습니까?')) history.back();
});

// 3. 카테고리 삭제하기
deleteButton.addEventListener('click', async (e) => {
  e.preventDefault();

  if (confirm('등록된 카테고리를 삭제하겠습니까?')) {
    let data = {
      categoryId: queryStringId,
    };

    const deleteCategory = await Api.patch(
      '/api/category/admin/drop',
      null,
      data,
    );

    // TODO 삭제 alert 창 띄우기
    window.location.href = '/admin-category';
  }
});

async function onRegisterCategory(e) {
  e.preventDefault();
  // Input Values
  const categoryName = inputCategoryName.value;
  const categoryImg = inputCategoryImg.value;
  let data = {};
  // let urlRegExp;

  // 유효성 검사1. 빈 양식 제출 방지
  const name = isEmptyInputValue(categoryName, inputCategoryName);
  if (!name) {
    alert('카테고리 이름을 입력해주세요.');
    return;
  }

  const url = isEmptyInputValue(categoryImg, inputCategoryImg);
  if (!url) {
    alert('이미지 URL을 입력해주세요.');
    return;
  }

  // TODO 유효성 검사3. url 양식
  // TODO 중복된 데이터 에러처리

  // 데이터 저장
  data = { categoryId: queryStringId, categoryName, categoryCode, categoryImg };

  // PATCH 요청
  const patchCategory = await Api.patch('/api/category/admin/edit', null, data);

  // 카테고리 목록으로 페이지 이동
  window.location.href = '/admin-category';
}

function isEmptyInputValue(inputValue, inputTag) {
  if (!inputValue) {
    inputTag.focus();
    return false;
  }
  return true;
}
