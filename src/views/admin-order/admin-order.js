import * as Api from "../api.js";

const admin_orderlist_table = document.querySelector("#admin-orderlist-table");
const modal = document.querySelector("#modal");
const modalBackground = document.querySelector("#modalBackground");
const modalCloseButton = document.querySelector("#modalCloseButton");
const deleteCompleteButton = document.querySelector("#deleteCompleteButton");
const deleteCancelButton = document.querySelector("#deleteCancelButton");

drawOrderList()
drawAllEvents()
function drawAllEvents() {
    modalBackground.addEventListener("click", closeModal);
    modalCloseButton.addEventListener("click", closeModal);

    deleteCompleteButton.addEventListener("click", deleteOrderData);
    deleteCancelButton.addEventListener("click", cancelDelete);
}
let orderId;
async function drawOrderList(){
    const orders = await Api.get('/api/order/admin/list/');
    console.log("dd");
    orders.items.map((order) => {
        
        const { orderId, userId, title, totalAmount, currStatus } = order;
        // const date = createdAt.slice(0, 10);
        admin_orderlist_table.insertAdjacentHTML(
            "beforeend",
            `
            <tbody>
                <tr id="${orderId}">
                    <td>${userId}</td>
                    <td>${title}</td>
                    <td>${totalAmount}</td>
                    <td>
                        <div class="select" >
                            <select class="selectBtn${orderId}">
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
                        <button class="button" id="deleteBtn${orderId}" >주문 삭제</button>
                    </td>
                </tr>
            </tbody>
            `
        );
        const selectBtnBox = document.querySelector(`.selectBtn${orderId}`);
        const deleteBtn = document.querySelector(`#deleteBtn${orderId}`);
        const index = selectBtnBox.selectedIndex;
        selectBtnBox.className = selectBtnBox[index].className;
        selectBtnBox.addEventListener("change", async () => {
            const newStatus = selectBtnBox.value;
            const status = { status: newStatus };
            const index = selectBtnBox.selectedIndex;
            selectBtnBox.className = selectBtnBox[index].className;
            await Api.patch("/api/shipping/admin/edit", orderId, status);
    });
    deleteBtn.addEventListener("click", () => {
        orderId = _id;
        openModal();
    });
});

}

async function deleteOrderData(e) {
    e.preventDefault();

    try {
        await Api.delete("/api/order/cancel", orderId);

        // 삭제 성공
        alert("주문 정보가 삭제되었습니다.");

        // 삭제한 아이템 화면에서 지우기
        const deletedItem = document.querySelector(`#${orderId}`);
        deletedItem.remove();

        // 전역변수 초기화
        orderId = "";

        closeModal();
    } catch (err) {
        alert(`오류가 발생하였습니다: ${err}`);
    }
}
function cancelDelete() {
    orderId = "";
    closeModal();
}
function openModal() {
    modal.classList.add("is-active");
}
function closeModal() {
    modal.classList.remove("is-active");
}
