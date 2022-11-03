// cart.js
import { data } from '../../db/dummy.js';

console.log('카트리스트');
// 요소 모음
const productList = document.querySelector('#products');
// 데이터를 받아 요소를 만든 후, html에 삽입
insertProductElement();
function insertProductElement() {
  console.log(data);
  console.log('장바구니리스트 test');
  data.items.map((item) => {
    const { code, title, price, imageUrl } = item;
    console.log(code, title, price, imageUrl);
    productList.insertAdjacentHTML(
      'beforeend',
      `
      <div class="box product-item ">
        <div>
          <figure>
            <img id="productImage" src="${imageUrl}" alt="clothes-image" />
          </figure>
        </div>
        <div class="description">
          <div class="detail">
            <h5 id="productTitle">${title}</h5>
            <p id="productCode">${code}</p>
          </div>
          <div class="price">
            <h5 id="productPrice">${price}원</h5>
          </div>
        </div>
      </div>
    `,
    );
  });
}
