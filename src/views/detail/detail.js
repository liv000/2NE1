// purchase-floating
const purchaseButton = document.querySelector('.btn-purchase');
const purchseFloating = document.querySelector('.purchase-floating');
const floatingClose = document.querySelector('.close-purchase');
// counter
const minusBtn = document.querySelector('.btn-minus');
const plusBtn = document.querySelector('.btn-plus');
const number = document.querySelector('.cnt-number');
const productPrice = document.querySelector('.price');
const totalPrice = document.querySelector('.total-price');
// menu fix
const navbar = document.querySelector('.navbar');
const scrollMenu = document.querySelector('.scroll-menu');
let navHeight = scrollMenu.clientHeight;
let menuHeight = scrollMenu.clientHeight;

let price = Number(productPrice.innerText);
let count = Number(number.innerText);

// floating onoff
purchaseButton.addEventListener('click', () => {
  purchseFloating.classList.add('on');
  purchaseButton.style.display = 'none';
});

floatingClose.addEventListener('click', () => {
  purchseFloating.classList.remove('on');
  purchaseButton.style.display = 'block';
});

// counter
plusBtn.addEventListener('click', () => {
  count++;
  number.innerText = count;
  totalPrice.innerText = `${(count * price).toLocaleString()}원`;
});

minusBtn.addEventListener('click', () => {
  if (count <= 1) {
    count = 1;
    return;
  }
  count--;
  number.innerText = count;
  totalPrice.innerText = `${(count * price).toLocaleString()}원`;
});

// menu fix
// window.onscroll = function () {
//   let windowTop = window.scrollY;
//   if (windowTop >= navHeight) {
//     scrollMenu.classList.add('fixed');
//   } else {
//     scrollMenu.classList.remove('fixed');
//   }
// };
