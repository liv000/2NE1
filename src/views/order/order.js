//order.js
import { addCommas, convertToNumber } from '../useful-functions.js';
import { data } from '../dummy.js';
const receiverNameInput = document.querySelector('#receiverName');
const receiverPhoneNumberInput = document.querySelector('#receiverPhoneNumber');
const postalCodeInput = document.querySelector('#postalCode');
const searchAddressButton = document.querySelector('#searchAddressButton');
const address1Input = document.querySelector('#address1');
const address2Input = document.querySelector('#address2');
const requestSelectBox = document.querySelector('#requestSelectBox');
const orderButton = document.querySelector('#orderButton');
const productCount = document.querySelector('#product-count');
const productTotal = document.querySelector('#product-total');
const totalPrice = document.querySelector('#total-price');
const deliveryPrice = document.querySelector('#delivery-price');

// 이벤트 추가
searchAddressButton.addEventListener('click', searchAddress);
orderButton.addEventListener('click', doCheckout);
drawOrderCard();
// 이벤트에 사용할 함수
function searchAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = '';
      let extraAddr = '';

      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
      } else {
      }

      postalCodeInput.value = data.zonecode;
      address1Input.value = `${addr} ${extraAddr}`;
      address2Input.placeholder = '상세 주소를 입력해 주세요.';
      address2Input.focus();
    },
  }).open();
}

async function doCheckout() {
  // 각 입력값 가져옴
  const receiverName = receiverNameInput.value;
  const receiverPhoneNumber = receiverPhoneNumberInput.value;
  const postalCode = postalCodeInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;
  const request = requestSelectBox.value;

  // 입력이 안 되어 있을 시
  if (!receiverName || !receiverPhoneNumber || !postalCode || !address2) {
    return alert('배송지 정보를 모두 입력해 주세요.');
  }

  // 객체 만듦
  const data2 = {
    receiverName,
    receiverPhoneNumber,
    postalCode,
    address1,
    address2,
    request,
  };

  // JSON 만듦
  const dataJson = JSON.stringify(data2);
  console.log(dataJson);
  const Test = {
    products: [
      {
        productId: '636651282a11afcbcfb0b97b',
        productName: '압박밴드',
        productPrice: 17900,
        quantity: 3,
      },
    ],
    fullName: '주문자',
    phoneNumber: '010-7777-8888',
    address: {
      postalCode: '12345',
      address1: 'sdafasf',
      address2: '성남',
    },
  };
  console.log(Test);
  const testJson = JSON.stringify(Test);
  const auth =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzYxZjQ1ZDc4YTcwNWI2NjQ4ZTE1ZDgiLCJyb2xlIjoxLCJpYXQiOjE2NjczNjM5ODd9.3N8s9wjh-QpD9BK2kDeV0g2QVgO5vXovvjtx_a7VSqg';
  // POST 요청
  const res = await fetch('/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
    body: testJson,
  });

  if (res.status === 201) {
    console.log(res);
    alert('주문에 성공하였습니다!');
  } else {
    alert('주문에 실패하였습니다...');
  }
}

//결제정보 카드에 상품 수와 가격 삽입
async function drawOrderCard() {
  console.log('결제카드 정보 삽입');
  let price = 20000;
  productCount.innerHTML = `${data.total}개`;
  productTotal.innerHTML = `${addCommas(price)}원`;
  deliveryPrice.innerHTML = `3,000원`;
  totalPrice.innerHTML = `${addCommas(price + 3000)}원`;
}
