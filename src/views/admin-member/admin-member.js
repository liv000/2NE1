// import { addCommas, checkAdmin, createNavbar } from "../../useful-functions.js";
import * as Api from "../api.js";

// 요소(element), input 혹은 상수
const admin_memberList = document.querySelector("#admin-memberList");
const modal = document.querySelector("#modal");
const modalBackground = document.querySelector("#modalBackground");
const modalCloseButton = document.querySelector("#modalCloseButton");
const deleteCompleteButton = document.querySelector("#deleteCompleteButton");
const deleteCancelButton = document.querySelector("#deleteCancelButton");

// checkAdmin();

addAllEvents();

// 요소 삽입 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
drawUsers()
// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
    modalBackground.addEventListener("click", closeModal);
    modalCloseButton.addEventListener("click", closeModal);
    document.addEventListener("keydown", keyDownCloseModal);
    deleteCompleteButton.addEventListener("click", deleteUserData);
    deleteCancelButton.addEventListener("click", cancelDelete);
}

// 페이지 로드 시 실행, 삭제할 회원 id를 전역변수로 관리함
let userIdToDelete;
async function drawUsers() {
    const users = await Api.get("/api/userlist");

  // 총 요약에 활용

    for (const user of users) {
        const { _id, email, fullName, password, createdAt } = user;
        const date = createdAt.split("T")[0];

        admin_memberList.insertAdjacentHTML(
            "beforeend",
            `
                <tr id="user-${_id}">
                    <td>${date}</td>
                    <td>${email}</td>
                    <td>${fullName}</td>
                    <td>${password}</td>
                    <td>
                        <div>
                            <button class="button" id="deletebtn-${_id}" >회원정보 삭제</button>
                        </div>
                    </td>
                </tr>
            `
        );

        // 요소 선택
        const deletebtn = document.querySelector(`#deletebtn-${_id}`);
        // 이벤트 - 삭제버튼 클릭 시 Modal 창 띄우고, 동시에, 전역변수에 해당 주문의 id 할당
        deletebtn.addEventListener("click", () => {
            userIdToDelete = _id;
            openModal();
        });
    }
}

    // db에서 회원정보 삭제
    async function deleteUserData(e) {
    e.preventDefault();

    try {
        await Api.delete("/api/user/drop", userIdToDelete);

        // 삭제 성공
        alert("회원 정보가 삭제되었습니다.");

        // 삭제한 아이템 화면에서 지우기
        const deletedItem = document.querySelector(`#user-${userIdToDelete}`);
        deletedItem.remove();

        // 전역변수 초기화
        userIdToDelete = "";

        closeModal();
    } catch (err) {
        alert(`회원정보 삭제 과정에서 오류가 발생하였습니다: ${err}`);
    }
}

// Modal 창에서 아니오 클릭할 시, 전역 변수를 다시 초기화함.
function cancelDelete() {
    userIdToDelete = "";
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