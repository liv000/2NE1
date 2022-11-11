import * as Api from '../api.js';
// import {data} from "../dummy.js";

const orderTable = document.querySelector('#order-table');
const modal = document.querySelector('#modal');
const modalBackground = document.querySelector('#modalBackground');
const modalCloseButton = document.querySelector('#modalCloseButton');
const deleteCompleteButton = document.querySelector('#deleteCompleteButton');
const deleteCancelButton = document.querySelector('#deleteCancelButton');
const pagination = document.querySelector('.pagination');
draworderList();
addAllEvents();

function addAllEvents() {
  modalBackground.addEventListener('click', closeModal);
  modalCloseButton.addEventListener('click', closeModal);
  deleteCompleteButton.addEventListener('click', deleteData);
  deleteCancelButton.addEventListener('click', cancelDelete);
}
let orderIdToDelete;
async function draworderList() {
  const orders = await Api.get('/api/order');
  const { totalPage, page, perPage } = orders;

  orders.order.map((order, index) => {
    const { _id, updatedAt, shipping } = order;

    let date = updatedAt.slice(0, 10);
    let shippingStatus = ' ';
    let disabled = '';
    if (shipping === 'pending' || shipping === 'PENDING') {
      shippingStatus = '배송 준비중';
    } else if (shipping === 'shipping' || shipping === 'SHIPPING') {
      shippingStatus = '배송중';
    } else if (shipping === 'shipped' || shipping === 'SHIPPED') {
      shippingStatus = '배송완료';
    } else if (shipping === 'canceled' || shipping === 'CANCELED') {
      shippingStatus = '주문취소';
      disabled = 'disabled';
    }

    const products = order.products
      .map((item) => {
        const { productName, productId, productPrice, quantity } = item;
        return `<table class = "table is-fullwidth"><tr><td>${productName}</td><td>${productPrice}원</td><td>${quantity}개</td></tr></table>`;
      })
      .join('');
    // <td>${productName}<br><a href="/detail/?product=${productId}">제품 설명 바로가기</a></td>

    orderTable.insertAdjacentHTML(
      'beforeend',
      `
              <tr id="no${_id}" >
                <td rowspan = ${order.products.length}>${date}</td>
                <td >${products}</td>
                <td>${shippingStatus}</td>
                <td><button id="deleteBtn${_id}" class="button is-warning is-light" ${disabled}>주문취소</button></td>
              </tr>
          `,
    );

    const deleteBtn = document.querySelector(`#deleteBtn${_id}`);
    deleteBtn.addEventListener('click', () => {
      orderIdToDelete = _id;
      openModal();
    });
  });
}

async function deleteData(e) {
  const data = { orderId: orderIdToDelete };
  e.preventDefault();
  try {
    await Api.patch('/api/order/cancel', null, data);

    // 삭제 성공
    alert('주문이 취소되었습니다.');
    location.reload();
    // 삭제한 아이템 화면에서 지우기
    const deletedItem = document.querySelector(`#order-${orderIdToDelete}`);
    // deletedItem.remove();

    // 전역변수 초기화
    orderIdToDelete = '';

    closeModal();
  } catch (err) {
    alert(`주문정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
  }
}
function cancelDelete() {
  orderIdToDelete = '';
  closeModal();
}

// Modal 창 열기
function openModal() {
  modal.classList.add('is-active');
}

// Modal 창 닫기
function closeModal() {
  modal.classList.remove('is-active');
}
