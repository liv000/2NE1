import * as Api from '../api.js';

// DOM Elements
const brandTitle = document.querySelector('.brand-title');
const productTitle = document.querySelector('.product-title');
const productImage = document.querySelector('.product-image');
const productPrice = document.querySelector('.product-price');
const productDetailImage = document.querySelector('.product-detail-image');
const productDescription = document.querySelector('.product-description');
const cartTitle = document.querySelector('.cart-title');
const cartPrice = document.querySelector('.cart-price');
const cartBtn = document.querySelector('.cart-btn');
const reviewBtn = document.querySelector('.review-btn');
const reviewList = document.querySelector('.review-list');
const inputReview = document.getElementById('product-review');

// purchase-floating
const purchaseButton = document.querySelector('.btn-purchase');
const purchseFloating = document.querySelector('.purchase-floating');
const floatingClose = document.querySelector('.close-purchase');

// counter
// const minusBtn = document.querySelector('.btn-minus');
// const plusBtn = document.querySelector('.btn-plus');
// const number = document.querySelector('.cnt-number');

// Get queryString
let productId = new URLSearchParams(window.location.search).get('product');
// const { id } = getUrlParams();
// console.log(id);

// 1. 데이터 요청
const productDetail = await Api.get(`/api/product/`, `${productId}`);
const { title, thumbnail, price } = productDetail;
const brandName = productDetail.brandInfo.title;
const { contentImg, description } = productDetail.content;
const { comments } = productDetail;

productImage.setAttribute('src', thumbnail);
productDetailImage.setAttribute('src', contentImg[0]);
brandTitle.innerText = brandName;
productTitle.innerText = title;
productPrice.innerText = `${price.toLocaleString()}원`;
productDescription.innerText = description;
cartTitle.innerText = title;
cartPrice.innerText = `${price.toLocaleString()}원`;

//
cartBtn.addEventListener('click', () => {
  // 로컬스토리지 카트리스트에 저장
  alert('장바구니에 담겼습니다.');
});

// 리뷰 렌더링
comments.forEach((element) => {
  reviewList.innerHTML += drawReviewList(element.content);
});

// 리뷰 등록
// TODO 권한 없으면 alert 창 띄우기 주문한 사람만 리뷰를 작성할 수 있습니다.
reviewBtn.addEventListener('click', async () => {
  const postReview = await Api.post(`/api/product/${productId}/comments`, {
    content: inputReview.value,
  });
});

function drawReviewList(content) {
  const reviewTemplelate = `
  <div class="review-list">
    <div class="mt-5">
      <h4 class="customer-name">${'이름'}</h4>
      <p class="review-content">${content}</p>
    </div>
  </div>    
  `;

  return reviewTemplelate;
}

// floating onoff
purchaseButton.addEventListener('click', () => {
  purchseFloating.classList.add('on');
  purchaseButton.style.display = 'none';
});

floatingClose.addEventListener('click', () => {
  purchseFloating.classList.remove('on');
  purchaseButton.style.display = 'block';
});

// counter
// plusBtn.addEventListener('click', () => {
//   count++;
//   number.innerText = count;
//   totalPrice.innerText = `${(count * price).toLocaleString()}원`;
// });

// minusBtn.addEventListener('click', () => {
//   if (count <= 1) {
//     count = 1;
//     return;
//   }
//   count--;
//   number.innerText = count;
//   totalPrice.innerText = `${(count * price).toLocaleString()}원`;
// });

// history.replaceState({}, null, location.pathname);
