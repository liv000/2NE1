import * as Api from "../api.js";
// import { createNavbar } from "../header-footer/navbar.js";
import drawHeaderFooter from "/navbar.js";
drawHeaderFooter();

const admin_orderlist_table = document.querySelector("#admin-orderlist-table");
const modal = document.querySelector("#modal");
const modalBackground = document.querySelector("#modalBackground");
const modalCloseButton = document.querySelector("#modalCloseButton");
const deleteCompleteButton = document.querySelector("#deleteCompleteButton");
const deleteCancelButton = document.querySelector("#deleteCancelButton");

// createNavbar();
drawOrderList()
drawAllEvents()
function drawAllEvents() {
    modalBackground.addEventListener("click", closeModal);
    modalCloseButton.addEventListener("click", closeModal);

    deleteCompleteButton.addEventListener("click", deleteOrderData);
    deleteCancelButton.addEventListener("click", cancelDelete);
}
let _id;
async function drawOrderList(){
    const orders = await Api.get('/api/order/admin/list');
    console.log(orders);
    orders.map((order) => {     
        const { _id, products, name, totalAmount, currStatus } = order;
        const productName=products[0].productName;
        // const date = createdAt.slice(0, 10);
        admin_orderlist_table.insertAdjacentHTML(
            "beforeend",
            `
            <tbody>
                <tr id="${_id}">
                    <td>${name}</td>
                    <td>${productName}</td>
                    <td>${totalAmount}</td>
                    <td>
                        <div class="select" >
                            <select class="selectBtn${_id}">
                                <option ${currStatus === "pending" ? "selected" : ""} 
                                    value="pending">
                                        배송준비중
                                </option>
                                <option ${currStatus === "shipping" ? "selected" : ""} 
                                    value="shipping">
                                        배송중
                                </option>
                                <option ${currStatus === "shipped" ? "selected" : ""} 
                                    value="shipped">
                                        배송완료
                                </option>
                                <option ${currStatus === "canceled" ? "selected" : ""} 
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
            `
        );
        const selectBtnBox = document.querySelector(`.selectBtn${_id}`);
        const deleteBtn = document.querySelector(`#deleteBtn${_id}`);
        const index = selectBtnBox.selectedIndex;
        selectBtnBox.className = selectBtnBox[index].className;
        selectBtnBox.addEventListener("change", async () => {
            const newStatus = selectBtnBox.value;
            const status = { status: newStatus };
            const index = selectBtnBox.selectedIndex;
            selectBtnBox.className = selectBtnBox[index].className;
            await Api.patch("/api/shipping/admin/edit", _id, status);
        });
    deleteBtn.addEventListener("click", () => {
        _id = _id;
        openModal();
    });
});

}

async function deleteOrderData(e) {
    e.preventDefault();

    try {
        await Api.delete("/api/order/cancel", _id);

        // 삭제 성공
        alert("주문 정보가 삭제되었습니다.");

        // 삭제한 아이템 화면에서 지우기
        const deletedItem = document.querySelector(`#${_id}`);
        deletedItem.remove();

        // 전역변수 초기화
        _id = "";

        closeModal();
    } catch (err) {
        alert(`오류가 발생하였습니다: ${err}`);
    }
}
function cancelDelete() {
    _id = "";
    closeModal();
}
function openModal() {
    modal.classList.add("is-active");
}
function closeModal() {
    modal.classList.remove("is-active");
}
