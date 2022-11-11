const header = document.querySelector('header');
const footer = document.querySelector('footer');
drawNavbar();
drawFooter();
function navbarTemplate() {
  const isLogin = localStorage.getItem('token') ? true : false;
  const isAdmin = localStorage.getItem('admin') ? true : false;
  console.log(isAdmin);
  let navTemplate = `
    <nav class="navbar is-flex is-align-content-center" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="m-2" href="/">
      <img src="../drug.png" width="50" height="50">
      </a>
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-item has-dropdown is-hoverable">
    <a href="/category/?ctg=636755e6275401639cfbd854"class="navbar-link">
      카테고리
    </a>
    <div class="navbar-dropdown">
    <a href="/category/?ctg=636755e6275401639cfbd854" class="navbar-item">
    여성건강/PMS
  </a>
  <a href="/category/?ctg=6367b0fc13b4bdae9b3e2a49" class="navbar-item">
    관절/뼈
  </a>
  <a href="/category/?ctg=6367b228cce37e82135cac0e" class="navbar-item">
    구강관리
  </a>
  <a href="/category/?ctg=636856f56042ab27326a435c" class="navbar-item">
    다이어트
  </a>
  <a href="/category/?ctg=6367b29e5dabb3fa66ff58a7" class="navbar-item">
    마음건강
  </a>
  <a href="/category/?ctg=6367b3225e591c5d53944f10" class="navbar-item">
    피부
  </a>
  <a href="/category/?ctg=6367b42ead640d20487c3df1" class="navbar-item">
    노화 / 항산화
  </a>
  <a href="" class="navbar-item">
    피로 / 활력
  </a>
  <a href="/category/?ctg=6367b505d4193600de787992" class="navbar-item">
    간 건강
  </a>
  <a href="/category/?ctg=6367b5eea28108ec51594b55" class="navbar-item">
    장 건강
  </a>
  <a href="/category/?ctg=6367b6dbc344c445b450449b" class="navbar-item">
    남성 건강
  </a>
  <a href="/category/?ctg=636858b71dcda1f26425d13d" class="navbar-item">
    위 / 소화
  </a>
  <a href="/category/?ctg=636b9a1962d1b330c4c44db9" class="navbar-item">
    변비
  </a>
  <a href="/category/?ctg=636b9a96732efe82ab4ea25d" class="navbar-item">
    눈건강
  </a>
  <a href="/category/?ctg=636b9b1e732efe82ab4ea262" class="navbar-item">
    모발 / 두피
  </a>
  </div>
  </div>
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
      <a href="/category/?ctg=all-product" class="navbar-item">
      신상품
  </a>
  <a href="/category/?ctg=all-product" class="navbar-item">
      베스트
  </a>
  <a href="/category/?ctg=all-product" class="navbar-item">
      할인
  </a>
  <a href="/category/?ctg=all-product" class="navbar-item">
      랭킹
  </a>
      </div>
      `;
  if (isLogin && !isAdmin) {
    navTemplate += `<div class="navbar-end">
    <div class="navbar-item">
      <div class="buttons">
        <a href="/mypage" class="button is-success is-light">
          <strong>마이페이지</strong>
        </a>
        <a href="/cart" class="button is-warning is-light">
          <strong>장바구니</strong>
        </a>
        <a class="button is-light" id="onClickLogout">
          <strong>로그아웃</strong>
        </a>
      </div>
    </div>
  </div>
</div>
</nav>`;
  } else if (isAdmin) {
    navTemplate += `<div class="navbar-end">
    <div class="navbar-item">
      <div class="buttons">
        <a href="/admin" class="button is-success is-light">
        <strong>관리자페이지</strong>
        </a>
        <a href="/cart" class="button is-warning is-light">
          <strong>장바구니</strong>
        </a>
        <a class="button is-light" id="onClickLogout">
          <strong>로그아웃</strong>
        </a>
      </div>
    </div>
  </div>
</div>
</nav>`;
  } else {
    navTemplate += `<div class="navbar-end">
    <div class="navbar-item">
      <div class="buttons">
        <a href="/register" class="button is-success is-light">
          <strong>회원가입</strong>
        </a>
        <a href="/login" class="button is-light">
          <strong>로그인</strong>
        </a>
        <a href="/cart" class="button is-warning is-light">
          <strong>장바구니</strong>
        </a>
      </div>
    </div>
  </div>
</div>
</nav>`;
  }
  return navTemplate;
}
function logout() {
  console.log('로그아웃');
  localStorage.clear();
  window.location.reload();
}
function drawNavbar() {
  header.insertAdjacentHTML('beforeend', navbarTemplate());
  document
    .querySelector('#onClickLogout')
    .addEventListener('click', () => logout());
}
function drawFooter() {
  footer.insertAdjacentHTML(
    'beforeend',
    `
          <div id="footer" class="store">
              <div id="footer-text" class="wrapper">
                  <div id="footer-section1">
                      <h4 class="footerTitle">당신의 건강을 책임지는 영양제<br><br></brt></h4>
                      <a href="https://www.instagram.com/"><img src="../instagramLogo.png" width="30" height="30">&nbsp;&nbsp;</a>
                      <a href="https://www.facebook.com/"><img src="../facebookLogo.png" width="30" height="30">&nbsp;&nbsp;</a>
                      <a href="https://line.me/en/"> <img src="../lineLogo.png" width="30" height="30"> </a>
                      
                  </div>
                  <div id="footer-section2" class="content">
                      <div class="cs">
                          <div class="info">
                              <a href="/cs/notice">
                                  고객센터 
                                  <span class="icon more"></span>
                              </a>
                              <p class="tel">
                                  010-0000-0000 
                                  <span>2ne1@elice.pj</span> 
                              </p>
                              <p class="hour"> 평일 오전 10:00 ~ 오후 18:00 (점심시간 12:00 ~ 14:00) </p>
                          </div>
                      </div>
                      <div class="last">
                          (주) 2NE1 
                          <em>|</em>
                          사업자번호: 아직 없음 
                          <em>|</em>
                          대표: 오승하 
                          <br>
                          개인정보취급담당부서: 백엔팀 
                          <em>|</em>
                          개인정보관리담당자: 지창준 
                          <br>
                          화면구성담당부서: 프엔팀 
                          <em>|</em>
                          화면구성관리담당자: 김보민, 김혜지, 이효정 
                          <br>
                          서울특별시 성동구 아차산호 17길 49 (성수동2가) 
                          <br>
                          연구소: 경기도 각자 집 
                          <br>
                          전화: 010-0000-0000
                          <em>|</em>
                          제휴문의: 2ne1@elice.pj
                      </div>
                  </div>
              <p class="copyright">ⓒ Carewith Inc. All Right Reversed.</p>
          </div>
      </div> 
          `,
  );
}
