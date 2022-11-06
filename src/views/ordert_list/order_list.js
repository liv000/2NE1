import { data } from '../../db/dummy.js';

// const order_date = document.querySelector(".date");
// const order_table = document.querySelector("#order-table");
// const modal = document.querySelector("#modal");
// const modalBackground = document.querySelector("#modalBackground");
// const modalCloseButton = document.querySelector("#modalCloseButton");
// const deleteCompleteButton = document.querySelector("#deleteCompleteButton");
// const deleteCancelButton = document.querySelector("#deleteCancelButton");

insertOrderTable();
function insertOrderTable(){
    const orders = await data.get('', 'db/models/order-model');
    orders.forEach((order) => {
        let orderDate = order.createdAt.slice(0, 10); //date만 slice
        let productListLength = order.productList.length; // 만약에 딱 한개의 상품 종류만 구입했다면,
        let productList = '';
        if (productListLength === 1) {
            productList = `상품 ID: ${order.productList[0].id} ${order.productList[0].quantity}개`; // 1개 정보
        } else {
            let remainder = productListLength - 1;
            productList = `상품 ID: ${order.productList[0].id} ${order.productList[0].quantity}개 외 ${remainder}개의 상품`; //1개 정보 + 몇개 더 있나
        }
        let paymentStatus = order.paymentStatus; // 기타 정보들
        // table에는 들어가지 않지만, class와 id 값으로 사용함.
        let orderId = order._id;

        let orderContent = `<div class="table-column order${orderId}">${orderDate}</div>
        <div class="table-column order${orderId}">${productList}</div>
        <div class="table-column order${orderId}">${paymentStatus}</div>
        <div class="table-column order${orderId}">
                        <button class="cancel-button" id=order${orderId} >Cancel</button>
                    </div>
        `;

        sectionContainer.innerHTML += orderContent; // grid에 붙이기.
    });
}

async function cancelOrder(){
    const checkMessage = window.confirm(
        '주문을 취소하시겠습니까?',
    );
    is (checkMessage){
        const entireRow = document.querySelectorAll(`.${this.id}`);
        const order_table = document.querySelector('#order-table');
        entireRow.forEach((el) => {
            order_table.removeChild(el);
        });
        const orderId = this.id.slice(5);
        await data.delete('', `db/models/order-model/${orderId}`);
        alert('정상적으로 취소되었습니다');
    }
}
