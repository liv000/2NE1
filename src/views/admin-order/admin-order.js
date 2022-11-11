import * as Api from '../api.js';
// import drawHeaderFooter from "../navbar.js";

const admin_orderlist_table = document.querySelector('#admin-orderlist-table');
const modal = document.querySelector('#modal');
const modalBackground = document.querySelector('#modalBackground');
const modalCloseButton = document.querySelector('#modalCloseButton');
const deleteCompleteButton = document.querySelector('#deleteCompleteButton');
const deleteCancelButton = document.querySelector('#deleteCancelButton');

drawOrderList();
drawAllEvents();
// drawHeaderFooter();
function drawAllEvents() {
  modalBackground.addEventListener('click', closeModal);
  modalCloseButton.addEventListener('click', closeModal);
  deleteCompleteButton.addEventListener('click', deleteOrderData);
  deleteCancelButton.addEventListener('click', cancelDelete);
}
let _id;
let userId;

async function drawOrderList() {
  const orders = await Api.get('/api/order/admin/list?page=1&perPage=10 n');

  orders.order.map((order, i) => {
    const { _id, products, name, totalAmount, shipping } = order;

    const detail = products
      .map(
        (e) =>
          `<tr class="Detail">
            <td colspan="2">${e.productName}</td>
            <td colspan="1">${e.productPrice}</td>
            <td colspan="2">${e.quantity}</td>
          </tr>`,
      )
      .join('');

    admin_orderlist_table.insertAdjacentHTML(
      'beforeend',
      `
                <tbody id="detail${_id}">
                    <tr id="d${_id}">
                        <td>${_id}</td>
                        <td>${name}</td>
                        <td>${totalAmount}</td>
                        <td>
                            <div class="select" >
                                <select class="selectBtn${_id}">
                                    <option ${
                                      shipping === 'PENDING' ? 'selected' : ''
                                    } 
                                        value="pending">
                                            배송준비중
                                    </option>
                                    <option ${
                                      shipping === 'SHIPPING' ? 'selected' : ''
                                    } 
                                        value="shipping">
                                            배송중
                                    </option>
                                    <option ${
                                      shipping === 'SHIPPED' ? 'selected' : ''
                                    } 
                                        value="shipped">
                                            배송완료
                                    </option>
                                    <option ${
                                      shipping === 'CANCELED' ? 'selected' : ''
                                    } 
                                        value="canceled">
                                            주문취소
                                    </option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <button class="button" id="deleteBtn${_id}" >주문 삭제</button>
                        </td>
                    </tr>
                </tbody>
                <tbody id= "showDetail${_id}" style="visibility: collapse">
                <tr class="showDetail">
                    <th colspan="2">상품명</th>
                    <th colspan="1">개수</th>
                    <th colspan="2">가격</th>
                </tr>
                    ${detail}                 
                </tbody>
                `,
    );
    const selectBtnBox = document.querySelector(`.selectBtn${_id}`);
    const deleteBtn = document.querySelector(`#deleteBtn${_id}`);
    const index = selectBtnBox.selectedIndex;
    selectBtnBox.className = selectBtnBox[index].className;
    selectBtnBox.addEventListener('change', async () => {
      const newStatus = selectBtnBox.value;
      const data = { status: newStatus, orderId: _id };
      const index = selectBtnBox.selectedIndex;
      selectBtnBox.className = selectBtnBox[index].className;
      await Api.patch('/api/shipping/admin/edit', null, data);
    });
    function orderCancel() {
      const deletedItem = document.querySelector(`#d${_id}`);

      deletedItem.style.backgroundColor = 'lightgrey';
      const order_cancel_btn = document.getElementById(`deleteBtn${_id}`);
      order_cancel_btn.disabled = true;
      selectBtnBox.disabled = true;
    }
    deleteBtn.addEventListener('click', () => {
      userId = _id;
      openModal(_id);
    });
    if (shipping === 'CANCELED') {
      orderCancel();
    }
    const show = document.querySelector(`#detail${_id}`);
    show.addEventListener('click', () => {
      userId = _id;
      showDetail();
    });
  });
}
const showDetail = async () => {
  const showDetail = document.querySelector(`#showDetail${userId}`);
  if (showDetail.style.visibility === 'collapse') {
    showDetail.style.visibility = 'visible';
  } else {
    showDetail.style.visibility = 'collapse';
  }
};

async function deleteOrderData(e) {
  e.preventDefault();
  try {
    await Api.patch('/api/order/admin/cancel', null, { orderId: userId });

    // 삭제 성공
    alert('주문 정보가 삭제되었습니다.');
    _id = '';
    location.reload();
    closeModal();
  } catch (err) {
    alert(`오류가 발생하였습니다: ${err}`);
  }
}
function cancelDelete() {
  _id = '';
  closeModal();
}
function openModal() {
  modal.classList.add('is-active');
}
function closeModal() {
  modal.classList.remove('is-active');
}

// async function getData() {
//     setPage += 1;
//     const res = await fetch(
//         /api/order/admin?list=${setlist}&perPage=${perPage}&page=${setPage},
//     );
//     const data = await res.json();
//     drawOrderList( data.orderList);
// };
// const AOL = await Api.post('/api/order/admin/list?page=1&perPage=4');
// async function pagenation () {
//     await Api.post('/api/order/admin/list?page=1&perPage=4');
// }
