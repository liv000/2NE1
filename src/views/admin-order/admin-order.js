import * as Api from "../api.js";
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
    console.log(orders);
    orders.order.map((order) => {
        const { _id, products, name, totalAmount, shipping } = order;

        const productName = products[0].productName;
        // const date = createdAt.slice(0, 10);
        admin_orderlist_table.insertAdjacentHTML(
        'beforeend',
        `
                <tbody>
                    <tr id="${_id}">
                        <td>${name}</td>
                        <td>${productName}</td>
                        <td>${totalAmount}</td>
                        <td>
                            <div class="select" >
                                <select class="selectBtn${_id}">
                                    <option ${
                                    shipping === 'pending' ? 'selected' : ''
                                    } 
                                        value="pending">
                                            배송준비중
                                    </option>
                                    <option ${
                                    shipping === 'shipping' ? 'selected' : ''
                                    } 
                                        value="shipping">
                                            배송중
                                    </option>
                                    <option ${
                                    shipping === 'shipped' ? 'selected' : ''
                                    } 
                                        value="shipped">
                                            배송완료
                                    </option>
                                    <option ${
                                    shipping === 'canceled' ? 'selected' : ''
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

        deleteBtn.addEventListener('click', () => {
            userId = _id;
            openModal(_id);
        });
    });
}

async function deleteOrderData(e) {
    e.preventDefault();
    try {
        await Api.patch('/api/order/cancel', null, { orderId: userId });

        // 삭제 성공
        alert('주문 정보가 삭제되었습니다.');

        // 삭제한 아이템 화면에서 지우기
        const deletedItem = document.querySelector(`#${_id}`);
        deletedItem.remove();

        // 전역변수 초기화
        _id = '';

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
async function pagenation () {
    await Api.post('/api/order/admin/list?page=1&perPage=4');
}