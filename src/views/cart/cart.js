// cart.js
import * as Api from '../api.js';
import { addCommas, convertToNumber } from '../useful-functions.js';
import { onClickCart } from './state.js';
import { data } from './dummy.js';
console.log('카트리스트');
// 요소 모음
const productTest = document.querySelector('#products-test');
const productList = document.querySelector('#products');
const productCount = document.querySelector('#product-count');
const productTotal = document.querySelector('#product-total');
const totalPrice = document.querySelector('#total-price');
const deliveryPrice = document.querySelector('#delivery-price');
insertTest();
insertProductElement();
drawOrderCard();
// 데이터를 받아 요소를 만든 후, html에 삽입
function insertProductElement() {
  // console.log(data);
  // console.log('장바구니리스트 test');
  // data.items.map((item) => {
  //   const { code, title, price, imageUrl } = item;
  //   console.log(code, title, price, imageUrl);
  //   productList.insertAdjacentHTML(
  //     'beforeend',
  //     `
  //     <div class="box product-item ">
  //       <div>
  //         <figure>
  //           <img id="productImage" src="${imageUrl}" alt="clothes-image" />
  //         </figure>
  //       </div>
  //       <div class="description">
  //         <div class="detail">
  //           <h5 id="productTitle">${title}</h5>
  //           <p id="productCode">${code}</p>
  //         </div>
  //         <div class="price">
  //           <h5 id="productPrice">${addCommas(price)}원</h5>
  //         </div>
  //       </div>
  //     </div>
  //   `,
  //   );
  // });
}

//결제정보 카드에 상품 수와 가격 삽입
async function drawOrderCard() {
  let price = 20000;
  productCount.innerHTML = `${data.total}개`;
  productTotal.innerHTML = `${addCommas(price)}원`;
  deliveryPrice.innerHTML = `3,000원`;
  totalPrice.innerHTML = `${addCommas(price + 3000)}원`;
}

async function getData() {
  // GET 요청
  const res = await fetch('/api/product/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();

  return result;
}
async function insertTest() {
  console.log('장바구니상품 test');
  const test = await getData();
  console.log('테스트', test.product);
  test?.product.map((item) => {
    const { _id, title, price, thumbnail } = item;
    // console.log(_id, title, price, thumbnail);
    productTest.insertAdjacentHTML(
      'beforeend',
      `
      <div class="box product-item ">
        <div>
          <figure>
            <img id="productImage" src="${thumbnail}" alt="clothes-image" />
          </figure>
        </div>
        <div class="description">
          <div class="detail">
            <h5 id="productTitle">${title}</h5>
            
          </div>
          <div class="price">
            <h5 id="productPrice">${addCommas(price)}원</h5>
          </div>
          
          <button type="button" class="button is-warning" onClick={(
            item,
            _id,
            ) => onClickCart(item, _id)}
            id="addToCartButton">
          장바구니 추가하기
        </button>
        </div>
      </div>
    `,
    );
  });
}
