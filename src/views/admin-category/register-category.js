import * as Api from '../api.js';

// const inputCtgName = document.getElementById('category-name');
// const ctgImgFile = document.getElementsByName('category-img-file')[0];
// const submit = document.getElementById('btn-submit');
// const ctgName = inputCtgName.value;
// const ctgImg = ctgImgFile.value;

// 카테고리 등록
let data = {
  categoryName: '에너지 충전',
  categortCode: 'vdflkvs',

  categoryImg: 'https://pilly.kr/images/store/concern/icon-diet_on@2x.png',
};

const registerCtg = await Api.post('/api/category/register', data);

// 클릭 이벤트 등록
// submit.addEventListener('click', onRegisterCtg);

// async function onRegisterCtg(e) {
//   e.preventDefault();
//   console.log('test');
// }
