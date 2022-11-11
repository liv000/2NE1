import * as Api from '../api.js';

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
    console.log(orders)
    orders.order.map((order,index) => {
        const { _id, updatedAt, shipping }= order;
        let date = updatedAt.slice(0, 10);
        console.log(date)
        order.products.map((item)=>{
            const {productName, productId, productPrice, quantity} = item;
            console.log("pro",order);
        let shippingStatus=" ";
        if(shipping==="pending" || shipping==="PENDING"){
            shippingStatus = "배송 준비중";
        }else if(shipping==="shipping" || shipping==="SHIPPING"){
            shippingStatus = "배송중";
        }else if(shipping==="shipped" || shipping==="SHIPPED"){
            shippingStatus = "배송완료";
        }else if(shipping==="canceled" || shipping==="CANCELED"){
            shippingStatus = "주문취소";
        }
        orderTable.insertAdjacentHTML(
            'beforeend',
            `
            <tbody>
                <tr id="no${_id}">
                    <td>${date}</td>
                    <td>${productName}<br><a href="/detail/?product=${productId}">제품 설명 바로가기</a></td>
                    <td>${productPrice}원<br>${quantity}개</td>
                    <td>${shippingStatus}</td>
                    <td><button id="deleteBtn${_id}" class="button">주문취소</button></td>
                </tr>
            </tbody>
            `
        );
        const deleteBtn = document.querySelector(`#deleteBtn${_id}`);
        deleteBtn.addEventListener("click", () => {
            orderIdToDelete = _id;
            openModal();
        });
    })
    });
}

async function deleteData(e){
    const data  = {orderId : orderIdToDelete}
    e.preventDefault();
    try{
        await Api.patch("/api/order/cancel",null, data);
    alert("주문 정보가 삭제되었습니다.");
    const deletedItem = document.querySelector(`#order-${orderIdToDelete}`);
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
function openModal() {
    modal.classList.add("is-active");
}
function closeModal() {
    modal.classList.remove("is-active");
}