import * as Api from '../api.js';
// import {data} from "../dummy.js";


const orderTable = document.querySelector("#order-table");
const modal = document.querySelector("#modal");
const modalBackground = document.querySelector("#modalBackground");
const modalCloseButton = document.querySelector("#modalCloseButton");
const deleteCompleteButton = document.querySelector("#deleteCompleteButton");
const deleteCancelButton = document.querySelector("#deleteCancelButton");

draworderList();
addAllEvents();

function addAllEvents() {
    modalBackground.addEventListener("click", closeModal);
    modalCloseButton.addEventListener("click", closeModal);
    deleteCompleteButton.addEventListener("click", deleteData);
    deleteCancelButton.addEventListener("click", cancelDelete);
}
let orderIdToDelete;
async function draworderList() {
    const orders = await Api.get('/api/order/?page=1&perPage=4');
    console.log(orders);
    orders.map((order) => {
        const { _id, code, title, price, shipping }= order;
        orderTable.insertAdjacentHTML(
            'beforeend',
            `
            <tbody>
                <tr id=no.${_id}>
                    <td>${code}</td>
                    <td>${title}</td>
                    <td>${price}원</td>
                    <td>${shipping}</td>
                    <td><button id="deleteBtn${_id}" class="button">주문취소</button></td>
                </tr>
            </tbody>
            `
        );
        const deleteBtn = document.querySelector(`#deleteBtn${_id}`);
        deleteBtn.addEventListener("click", () => {
            orderIdToDelete = _id;
            openModal();
        })
    });
}

async function deleteData(e){
    e.preventDefault();
    try{
        await Api.patch("/order/cancel", orderIdToDelete);

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