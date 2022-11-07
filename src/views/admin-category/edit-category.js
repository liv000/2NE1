import * as Api from '../api.js';

// DOM Elements
const inputCategoryName = document.getElementById('category-name');
const inputCategoryImg = document.getElementById('category-url');
const submit = document.getElementById('btn-submit');

// Get queryString
let queryStringId = new URLSearchParams(window.location.search).get('id');
let categoryCode = '';

// GET 요청
const categories = await Api.get('/api/category/list', '');
for (let category of categories) {
  if (queryStringId !== category._id) continue;
  inputCategoryName.value = category.categoryName;
  inputCategoryImg.value = category.categoryImg;
  categoryCode = category.categoryCode;
}

// 카테고리 수정
submit.addEventListener('click', onRegisterCategory);

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
  console.log(data);
  // PATCH 요청
  const patchCategory = await Api.patch('/api/category/admin/edit', data);

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
