// mypage.js
import * as Api from '../api.js';
import { validateEmail } from '/useful-functions.js';

// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector('#product-name');
const emailInput = document.querySelector('#emailInput');
const phoneNumberInput = document.querySelector('#phoneNumber');
const passwordInput = document.querySelector('#password');
const postCodeInput = document.querySelector('#postCodeInput');
const adrress1Input = document.querySelector('#adrress1Input');
const adrress2Input = document.querySelector('#adrress2Input');
// const dropButton = document.querySelector('#drop');
const submitButton = document.querySelector('#btn-submit');

renderElements();
addAllElements();
addAllEvents();

function renderElements() {
  // 해당 유저 정보 불러오기
  insertData();
}

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
function addAllEvents() {
  submitButton.addEventListener('click', handleSubmit);
  // dropButton.addEventListener('click', drop);
}

// async function drop(e) {
//   e.preventDefault();
//   try {
//     const drop = await Api.patch('/api/user/drop', null, {
//       currentPassword: passwordInput,
//     });
//     if (drop) {
//       alert('탈퇴되었습니다.');
//     }
//   } catch (e) {
//     console.error(e.stack);
//     alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${e.message}`);
//   }
// }
let userId;
// 수정 전 유저 기존 데이터 자동 완성
async function insertData() {
  const userData = await Api.get('/api/user');

  const { _id, fullName, phoneNumber, address, email } = userData;
  if (address) {
    const { postalCode, address1, address2 } = address;

    postCodeInput.value = postalCode;

    adrress1Input.value = address1;

    adrress2Input.value = address2;
  }
  // 나중에 사용자가 비밀번호 변경을 위해 입력했는지 확인하기 위함임.
  userData.password = '';
  userId = _id;
  fullNameInput.value = fullName;
  if (phoneNumber) {
    phoneNumberInput.value = phoneNumber;
  }
  if (email) {
    emailInput.value = email;
  }
}

// 수정 진행
async function handleSubmit(e) {
  e.preventDefault();
  const fullName = fullNameInput.value;
  const currentPassword = passwordInput.value;
  const phoneNumber = phoneNumberInput.value;
  const email = emailInput.value;
  const postCode = postCodeInput.value;
  const address1 = adrress1Input.value;
  const address2 = adrress2Input.value;

  const isEmailValid = validateEmail(email);

  if (!isEmailValid) {
    return alert('이메일 형식이 맞지 않습니다.');
  }

  // 수정 api 요청
  try {
    const data = {
      fullName,
      email,
      phoneNumber,
      currentPassword,
      address: { postalCode: postCode, address1, address2 },
    };

    await Api.patch(`/api/user/edit`, userId, data);

    alert(`정상적으로 수정이 완료되었습니다.`);

    // 마이 페이지 이동
    window.location.href = '/mypage';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
