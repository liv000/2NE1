// const state ={
//     cartList={},
// }
const onClickCart = (item, idx) => {
  localStorage.setItem('cartList', JSON.stringify(item));
  //   alert('장바구니에 담겼습니다.');
  console.log('장바구니에 담겼습니다.');
};

export { onClickCart };
