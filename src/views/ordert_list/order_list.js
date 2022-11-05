// 아직 수정 중-예시사이트참고수정중
import * as Api from '/api.js';

//async event handler - 취소누르면 취소되는 기능
async function handleCancelOrderClick() {
    const isConfirmed = window.confirm(
        '주문을 취소하면 되돌릴 수 없습니다. 정말 취소하겠습니까?',
    );
    if (isConfirmed) {
        const entireRow = document.querySelectorAll(`.${this.id}`); // 현재 orderId의 줄 node들
        const sectionContainer = document.querySelector('#section-container'); // parent node

        entireRow.forEach((el) => {
            sectionContainer.removeChild(el); // grid에서 삭제할 id의 주문 줄을 전부 골라 삭제
        });
        const orderId = this.id.slice(5); //orderId를 다시 그냥 숫자로 변환
        //주문 삭제
        await Api.delete('', `api/admin/orders/${orderId}`);
        alert('정상적으로 취소되었습니다');
    }
}

//order list 생성
const orders = await Api.get('', 'api/admin/orders');
const sectionContainer = document.querySelector('#section-container');
orders.forEach((order) => {
    let orderDate = order.createdAt.slice(0, 10); //date만 slice
    let deliveryAddress =
        order.deliveryAddress.postalCode + ' ' + order.deliveryAddress.address1; //주소 변환
    let productListLength = order.productList.length; // 만약에 딱 한개의 상품 종류만 구입했다면,
    let productList = '';
    if (productListLength === 1) {
        productList = `상품 ID: ${order.productList[0].id} ${order.productList[0].quantity}개`; // 1개 정보
    } else {
        let remainder = productListLength - 1;
        productList = `상품 ID: ${order.productList[0].id} ${order.productList[0].quantity}개 외 ${remainder}개의 상품`; //1개 정보 + 몇개 더 있나
    }

    let paymentStatus = order.paymentStatus; // 기타 정보들
    let billingMethod = order.billingMethod;
    // table에는 들어가지 않지만, class와 id 값으로 사용함.
    let orderId = order._id;

    let orderContent = `<div class="table-column order${orderId}">${orderDate}</div>
    <div class="table-column order${orderId}">${deliveryAddress}</div>
    <div class="table-column order${orderId}">${productList}</div>
    <div class="table-column order${orderId}">${paymentStatus}</div>
    <div class="table-column order${orderId}">${billingMethod}</div>
    <div class="table-column order${orderId}">
                    <button class="cancel-button" id=order${orderId} >Cancel</button>
                </div>
    `;

    sectionContainer.innerHTML += orderContent; // grid에 붙이기.
});

const buttons = document.querySelectorAll('button'); //전부 작성이 끝난 후 모든 버튼 선택

buttons.forEach((button) => {
    // 모든 버튼에 event handler 부착.
    button.addEventListener('click', handleCancelOrderClick);
});


// 아직 수정 중-보민님 코드에서 수정 중
// import { data } from '../../db/dummy.js';

// console.log('주문목록');
// // 요소 모음
// const order_table = document.querySelector("#order-table");
// // 데이터를 받아 요소를 만든 후, html에 삽입
// insertProductElement();
// function insertProductElement() {
//   console.log(data);
//   console.log('주문목록 test');
//   data.items.map((item) => {
//     const { code, title, price, imageUrl } = item;
//     console.log(code, title, price, imageUrl);
//     productList.insertAdjacentHTML(
//       'beforeend',
//       `
//       <div class="box product-item ">
//         <div>
//           <figure>
//             <img id="productImage" src="${imageUrl}" alt="clothes-image" />
//           </figure>
//         </div>
//         <div class="description">
//           <div class="detail">
//             <h5 id="productTitle">${title}</h5>
//             <p id="productCode">${code}</p>
//           </div>
//           <div class="price">
//             <h5 id="productPrice">${price}원</h5>
//           </div>
//         </div>
//       </div>
//     `,
//     );
//   });
// }


// db에서 주문정보 삭제
async function deleteOrderData(e) {
    e.preventDefault();
  
    try {
      await Api.delete("/api/orders", orderIdToDelete);
  
      // 삭제 성공
      alert("주문 정보가 삭제되었습니다.");
  
      // 삭제한 아이템 화면에서 지우기
      const deletedItem = document.querySelector(`#order-${orderIdToDelete}`);
      deletedItem.remove();
  
      // 전역변수 초기화
      orderIdToDelete = "";
  
      closeModal();
    } catch (err) {
      alert(`주문정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
    }
  }
  
  // Modal 창에서 아니오 클릭할 시, 전역 변수를 다시 초기화함.
  function cancelDelete() {
    orderIdToDelete = "";
    closeModal();
  }
  
  // Modal 창 열기
  function openModal() {
    modal.classList.add("is-active");
  }
  
  // Modal 창 닫기
  function closeModal() {
    modal.classList.remove("is-active");
  }
  
  // 키보드로 Modal 창 닫기
  function keyDownCloseModal(e) {
    // Esc 키
    if (e.keyCode === 27) {
      closeModal();
    }
  }

