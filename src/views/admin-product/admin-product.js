import * as Api from '../api.js';
const tbody = document.querySelector('.table > tbody');

// 제품
const products = await Api.get('/api/product/productList', '');
products.forEach((product) => {
  // const { idx, title, categoryImg, createdAt } = product;
  console.log(product);
  // TODO 등록일 수정

  // 목록 조회
  // tbody.innerHTML += drawAdminProductList(
  //   idx,
  //   productName,
  //   category,
  //   title,
  //   price,
  //   createdAt,
  // );
});

function drawAdminProductList() {
  const productListTemplate = `
  <tr>
    <td>${idx}</td>
    <td>${category}</td>
    <td><a href="/${'tempUrl'}"><span>[${title}]<span> ${productName}</a></td>
    <td>${price}</td>
    <td>${stock}</td>
    <td>${createdAt}</td>
    <td><button class="btn-edit">수정</button></td>
  </tr>`;

  return productListTemplate;
}

// TODO 메인 & 카테고리 아이콘, 페이지 컴포넌트화 하기
// TODO 파일 분리하기
function drawProductList() {
  const productListTemplate = `
  <li>
    <a href="${0}">
      <figure class="product-img">
        <img src="${0}" alt="${0}" />
      </figure>
      <div class="product-information">
        <span>${0}</span>
        <h3>
          <span>[${0}]</span> ${0}
        </h3>
        <p class="product-price">${0}원</p>
      </div>
    </a>
  </li>`;

  return productListTemplate;
}
