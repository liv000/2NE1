import * as Api from "../api.js";

const admin_memberList = document.querySelector("#admin-memberList");

drawUsers()

async function drawUsers() {
    const users = await Api.get("/api/admin/userList");
    console.log(users);
    for (const user of users) {
        const { _id, email, fullName, phoneNumber, createdAt } = user;
        const date = createdAt.split("T")[0];
        let phone_Number="";
        if (phoneNumber===undefined){
            phone_Number="";
        }else{
            phone_Number=phoneNumber;
        }
        admin_memberList.insertAdjacentHTML(
            "beforeend",
            `
                <tr class="userList" id="user-${_id}">
                    <td>${date}</td>
                    <td>${email}</td>
                    <td>${fullName}</td>
                    <td>${phone_Number}</td>
                </tr>
            `
        );
    }
}