const footer = document.querySelector('footer');
drawFooter();
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
