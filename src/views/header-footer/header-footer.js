// 헤더-푸터는 컴포넌트화 해야함
// 아직 변수명 바꿔야하는 상태





const toggleBtn = document.querySelector('.navbar-toogleBtn');
const menu = document.querySelector('#header-navbar');

// const categoryBtn = document.querySelector('#more-category-btn')
// const more_category = document.querySelector('#header-more-category')



toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// categoryBtn.addEventListener('click', () => {
//     more_category.toggle('active');
// });