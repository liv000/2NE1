// dummy에서 지정한 데이터 불러오기 가능
// 주문 삭제 수정 필요
import * as Api from "/api.js";
import { data } from '/dummy.js';

const admin_orderlist_table = document.querySelector("#admin-orderlist-table");
const modal = document.querySelector("#modal");
const modalBackground = document.querySelector("#modalBackground");
const modalCloseButton = document.querySelector("#modalCloseButton");
const deleteCompleteButton = document.querySelector("#deleteCompleteButton");
const deleteCancelButton = document.querySelector("#deleteCancelButton");

// fetch('http://localhost:3000/users', {method: 'GET', headers:{'Content-Type':'application/json'},})
// .then(res=>res.json())
// .then(data=> {
//     data.forEach((item)=>{
//         let date = item.createdAt.slice(0, 10);
//     })
// }
//     )
// .catch(error=>console.error('Error:',error));
console.log(data.items[0].userId);
console.log(data.items[0].title);

drawOrderList()
drawAllEvents()
function drawAllEvents() {
    modalBackground.addEventListener("click", closeModal);
    modalCloseButton.addEventListener("click", closeModal);

    deleteCompleteButton.addEventListener("click", deleteOrderData);
    deleteCancelButton.addEventListener("click", cancelDelete);
}
let orderIdToDelete;
async function drawOrderList(){
    data.items.map((item) => {

        const { _id, userId, title, totalAmount, currStatus } = item;
        // const date = createdAt.slice(0, 10);
        admin_orderlist_table.insertAdjacentHTML(
            "beforeend",
            `
            <tbody>
                <tr id="${_id}">
                    <td>${userId}</td>
                    <td>${title}</td>
                    <td>${totalAmount}</td>
                    <td>
                        <div class="select" >
                            <select class="selectBtn${_id}">
                                <option ${currStatus === "상품 준비중" ? "selected" : ""} 
                                    value="상품 준비중">
                                        상품 준비중
                                </option>
                                <option ${currStatus === "상품 배송중" ? "selected" : ""} 
                                    value="상품 배송중">
                                        상품 배송중
                                </option>
                                <option ${currStatus === "배송완료" ? "selected" : ""} 
                                    value="배송완료">
                                        배송완료
                                </option>
                                <option ${currStatus === "주문취소" ? "selected" : ""} 
                                    value="주문취소">
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
            `
        );
        const selectBtnBox = document.querySelector(`.selectBtn${_id}`);
        const deleteBtn = document.querySelector(`#deleteBtn${_id}`);
        const index = selectBtnBox.selectedIndex;
        selectBtnBox.className = selectBtnBox[index].className;
        selectBtnBox.addEventListener("change", async () => {
            const newStatus = selectBtnBox.value;
            const data = { status: newStatus };
            const index = selectBtnBox.selectedIndex;
            selectBtnBox.className = selectBtnBox[index].className;
            await Api.patch("/api/orders", _id, data);
    });
    deleteBtn.addEventListener("click", () => {
        orderIdToDelete = _id;
        openModal();
    });
});

}

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
        alert(`오류가 발생하였습니다: ${err}`);
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
