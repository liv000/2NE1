// cart.js
import * as Api from '../api.js';
import { addCommas, convertToNumber } from '../useful-functions.js';
console.log('카트');
// 요소 모음
const productTest = document.querySelector('#products-test');
const productList = document.querySelector('#products');
const deleteButton = document.querySelector('#deleteButton');
const productCount = document.querySelector('#product-count');
const productTotal = document.querySelector('#product-total');
const totalPrice = document.querySelector('#total-price');
const deliveryPrice = document.querySelector('#delivery-price');

const cartList = JSON.parse(localStorage.getItem('products'));
insertTest();
insertProductElement();
drawOrderCard();
// 데이터를 받아 요소를 만든 후, html에 삽입
function insertProductElement() {
  console.log('장바구니리스트 test');
  console.log(cartList);
  if (cartList === null) {
    productList.insertAdjacentHTML(
      'beforeend',
      `<div class="box empty">
      <img src="../images/icon-cart@2x.png" width="64px" height="64px" />
      <p>장바구니에 담겨있는 제품이 없어요.</p>
      <p>나에게 필요한 영양제를 추천받고 장바구니에 담아보세요!</p>
    </div>`,
    );
  }
  deleteButton.innerHTML = `<button class = "button is-small  is-rounded mt-4" id="deleteItem">
  전체 삭제
  </button>`;
  cartList.map((item) => {
    const { productId, productName, productPrice, quantity } = item;
    productList.insertAdjacentHTML(
      'beforeend',
      `
      <div class="box product-item ">
        <div>
          <figure>
            <img id="productImage" src="" alt="thumnail-image" />
          </figure>
        </div>
        <div class="description">
        <button class = "button is-small  is-rounded ml-2 mb-2" id="deleteItem-${productId}">
      선택 삭제
      </button>
        <h5 id="productTitle">${productName}</h5>
        
          <div class="detail is-flex">
            <h5 id="quantity"> 
            <button
            class="button is-small is-rounded  ml-2 mb-2"
            id="minus--${productId}">-</button>
            ${quantity}
            </h5>
            <button
            class="button is-small  is-rounded ml-2 mb-2"
            id="plus-${productId}">+</button>
          </div>
          <div class="price">
            <h5 id="productPrice">${addCommas(productPrice)}원</h5>
          </div>
        </div>
      </div>
    `,
    );
    document
      .querySelector(`#deleteItem-${productId}`)
      .addEventListener('click', async () => {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        let delIndex;
        products.map((item, index) => {
          if (item.productId === `${productId}`) {
            console.log('선택삭제');
            delIndex = index;
          }
        });
        console.log(delIndex);
        products.splice(delIndex, 1);
        localStorage.setItem('products', JSON.stringify(products));
      });
    //   document
    //     .querySelector(`#plus-${productId}`)
    //     .addEventListener('click', async () => {});
  });
}
//결제정보 카드에 상품 수와 가격 삽입
async function drawOrderCard() {
  console.log('결제정보카드', cartList);
  let allPrice = 0;
  let totalCount = 0;
  cartList.map((item) => {
    const { productPrice, quantity } = item;
    allPrice += productPrice * quantity;
    totalCount += quantity;
    // console.log(allPrice);
  });
  let price = allPrice;
  productCount.innerHTML = totalCount + '개';
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

//여기서부터 detail.js에 들어갈 아이
async function insertTest() {
  console.log('장바구니상품 test');
  const test = await getData();
  // console.log('테스트', test.product);
  test?.product.map((item) => {
    const { _id, title, price, thumbnail } = item;
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
          
          <button type="button" class="button is-warning" id="addToCartButton-${_id}">
          장바구니 추가하기
        </button>
        </div>
      </div>
    `,
    );
    //디테일에 들어갈 카트 버튼
    document
      .querySelector(`#addToCartButton-${_id}`)
      .addEventListener('click', async () => {
        try {
          const products = JSON.parse(localStorage.getItem('products')) || [];
          const product = {
            productId: `${_id}`,
            productName: `${title}`,
            productPrice: `${price}`,
            quantity: 1,
          };
          localStorage.setItem('product', JSON.stringify(product));
          products.push(product);
          localStorage.setItem('products', JSON.stringify(products));
          console.log(`${title} 이 장바구니에 추가`);
          alert('장바구니에 추가되었습니다.');
        } catch (err) {
          if (err.message.includes('Key')) {
            alert('이미 장바구니에 추가되어 있습니다.');
          }
          console.log(err);
        }
      });
  });
}
