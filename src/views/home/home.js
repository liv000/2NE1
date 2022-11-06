// 고민별 상품 보기 아이콘 온오프
const concernLinks = document.querySelectorAll('.concern-link');
const defaultIcons = document.querySelectorAll('.default-icon');
const onIcons = document.querySelectorAll('.on-icon');

/**
 * 아이콘 on
 * 1. link에 마우스오버
 * 2. 기본 아이콘 none
 * 3. on 아이콘 block
 * 4. 텍스트 색깔 변경
 *
 * 아이콘 off
 * 1. 기본 아이콘 block
 * 2. on 아이콘 none
 * 3. 텍스트 색깔 변경
 *  */

concernLinks.forEach((icon) =>
  icon.addEventListener('click', (e) => iconOn(e)),
);

function iconOn(e) {
  console.log(e.target.nodeName);
}
