import * as Api from '../api.js';

// DOM Elements
const inputCategoryName = document.getElementById('category-name');
const inputCategoryCode = document.getElementById('category-code');
const inputCategoryImg = document.getElementById('category-url');
const submit = document.getElementById('btn-submit');

// Global Variable
let data = {};

// 카테고리 등록
submit.addEventListener('click', onRegisterCategory);

async function onRegisterCategory(e) {
  e.preventDefault();
  // Input Values
  const categoryName = inputCategoryName.value;
  const categoryCode = inputCategoryCode.value;
  const categoryImg = inputCategoryImg.value;
  let numberRegExp = /^[0-9]+/g;
  // let urlRegExp;

  // 유효성 검사1. 빈 양식 제출 방지
  const name = isEmptyInputValue(categoryName, inputCategoryName);
  if (!name) {
    alert('카테고리 이름을 입력해주세요.');
    return;
  }

  const code = isEmptyInputValue(categoryCode, inputCategoryCode);
  if (!code) {
    alert('카테고리 코드를 입력해주세요.');
    return;
  }

  const url = isEmptyInputValue(categoryImg, inputCategoryImg);
  if (!url) {
    alert('이미지 URL을 입력해주세요.');
    return;
  }

  // 유효성 검사2. code 양식
  if (!numberRegExp.test(code) && categoryCode.length !== 4) {
    alert('4자리 숫자 코드로 입력해주세요.');
    return false;
  }

  // TODO 유효성 검사3. url 양식
  // TODO 중복된 데이터 에러처리

  // 데이터 저장
  data = { categoryName, categoryCode, categoryImg };

  // POST 요청
  const postCategory = await Api.post('/api/category/register', data);

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
