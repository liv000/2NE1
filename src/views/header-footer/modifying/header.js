// header 컴포넌트 구현 중, 아직 미완성
import setHeader from '../utils/header';

class Header extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `    
        <nav id="header-logo">
        <a href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" width="150" height="28">
        </a>
        <a id="header-logo-text">약쟁이네 약팔이</a>
        <a href="#" class="navbar-toogleBtn">
            <i class="fa-solid fa-bars"></i>
        </a>
        </nav>
        <!--메뉴바 왼쪽 끝  -->
        <nav id="header-navbar" class="navbar-menu">
            <div class="navbar-start">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        카테고리
                    </a>   
                    <div class="navbar-dropdown">
                        <a class="navbar-item">
                            여성건강/PMS
                        </a>
                        <a class="navbar-item">
                            관절/뼈
                        </a>
                        <a class="navbar-item">
                            구강관리
                        </a>
                        <a class="navbar-item">
                            다이어트
                        </a>
                        <a class="navbar-item">
                            마음건강
                        </a>
                        <a class="navbar-item">
                            피부
                        </a>
                        <a class="navbar-item">
                            노화 / 항산화
                        </a>
                        <a class="navbar-item">
                            피로 / 활력
                        </a>
                        <a class="navbar-item">
                            간 건강
                        </a>
                        <a class="navbar-item">
                            장 건강
                        </a>
                        <a class="navbar-item">
                            남성 건강
                        </a>
                        <a class="navbar-item">
                            위 / 소화
                        </a>
                        <a class="navbar-item">
                            변비
                        </a>
                        <a class="navbar-item">
                            눈건강
                        </a>
                        <a class="navbar-item">
                            모발 / 두피
                        </a>
                        <a class="navbar-item">
                            유 / 소아
                        </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item">
                            Report an issue
                        </a>
                        </div>
                    </div>
                    <a class="navbar-item">
                        신상품
                    </a>
                    <a class="navbar-item">
                        베스트
                    </a>
                    <a class="navbar-item">
                        할인
                    </a>
                    <a class="navbar-item">
                        Notice
                    </a>
                    <a class="navbar-item">
                        랭킹
                    </a>
                </div>
                <!-- 메뉴바 오른쪽 끝 -->
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                        <a class="button is-primary" href="/register">
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light" href="/login">
                            Log in
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    </header> `;
    }

    connectedCallback() {
        setHeader();
    }
}

export default function defineMainHeader() {
    customElements.define('main-header', Header);
}