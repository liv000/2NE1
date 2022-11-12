# 2NE1

- [서비스 소개](#서비스-소개)
- [기술 스택](#기술-스택)
- [인프라 구조](#인프라-구조)
- [제작자](#제작자)
- [실행 방법](#실행-방법)
- [트러블 슈팅](#트러블-슈팅)

## 서비스 소개

- 사용자에게 영양제 정보를 제공하고, 주문할 수 있는 사이트
- 효능에 따른 영양제를 검색하고, 영양제의 섭취 방법 등의 정보를 제공받을 수 있다.

목표 : 제품 등록, 장바구니 추가, 주문하기 등 쇼핑몰의 핵심 서비스를 구현합니다.

1. 회원가입, 로그인, 회원정보 수정 등 **유저 정보 관련 CRUD**
2. **제품 목록**을 조회 및, **제품 상세 정보**를 조회 가능함.
3. 장바구니에 제품을 추가할 수 있으며, **장바구니에서 CRUD** 작업이 가능함.
4. 장바구니는 서버 DB가 아닌, 프론트 단에서 저장 및 관리됨 (localStorage, indexedDB 등)
5. 장바구니에서 주문을 진행하며, **주문 완료 후 조회 및 삭제**가 가능함.
6. 추가 기능 ...

### 1-1. API 문서

### https://documenter.getpostman.com/view/16132058/2s8YRnmXTf#

<br>

### 1-2. 데모 영상

<details><summary>사용자 회원가입, 로그인</summary>

![image](https://user-images.githubusercontent.com/91174156/172159634-1e105633-9948-464e-a540-5429200a1353.gif)

</details>

<details><summary>카테고리 추가 및 반영</summary>

추후 관련 영상을 삽입하세요 (하기 2가지 방법 가능)

1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<details><summary>제품 추가 및 반영</summary>

추후 관련 영상을 삽입하세요 (하기 2가지 방법 가능)

1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<details><summary>장바구니 기능</summary>

추후 관련 영상을 삽입하세요 (하기 2가지 방법 가능)

1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<details><summary>주문 기능</summary>

추후 관련 영상을 삽입하세요 (하기 2가지 방법 가능)

1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<details><summary>관리자 페이지</summary>

추후 관련 영상을 삽입하세요 (하기 2가지 방법 가능)

1. 화면녹화 -> 유튜브 업로드 -> 유튜브 링크 삽입
2. 화면움짤녹화 -> 움짤삽입 (https://www.screentogif.com/ 활용가능)

</details>

<br />

### 1-3. 페이지 별 화면

|                                              |                                              |
| -------------------------------------------- | -------------------------------------------- |
| ![image](https://i.ibb.co/jyxjcd3/image.png) | ![image](https://i.ibb.co/Q860RKz/image.png) |
| 메인 페이지                                  | 회원가입 화면                                |
| ![image](https://i.ibb.co/RpYN379/image.png) |                                              |
| 로그인 페이지                                | 앞으로 추가할 페이지                         |

<br />

## 기술 스택

![image](https://i.ibb.co/N34mXzy/image.png)

<br />

### 2-1. 프론트엔드

- **Vanilla javascript**, html, css (**Bulma css**)
- Font-awesome
- Daum 도로명 주소 api
- 이외

### 2-2. 백엔드

- **Express** (nodemon, babel-node로 실행됩니다.)
- Mongodb, Mongoose
- cors
- 이외

## 인프라 구조

![image](https://i.ibb.co/9tGxmx0/image.png)<br />

### 3-1. 폴더 구조

- 프론트: `src/views` 폴더
- 백: src/views 이외 폴더 전체
- 실행: **프론트, 백 동시에, express로 실행**

<br />

## 제작자

| 이름   | 담당 업무 |
| ------ | --------- |
| 오승하 | 팀장/BE   |
| 지창준 | BE        |
| 김혜지 | FE        |
| 이효정 | FE        |
| 김보민 | FE        |

<br />

## 실행 방법

1. 레포지토리를 클론하고자 하는 디렉토리에서 아래 명령어를 수행

```bash
git clone <레포지토리 주소>
```

2. 클론한 디렉토리에서 backend 디렉토리로 들어가 아래 명령어를 통해 backend에서 필요한 module 설치

```bash
npm install
```

3. backend에서 필요한 `.env` 설정

```bash
MONGODB_URL=<몽고DB URL>
PORT=5000
JWT_SECERT_KEY=<랜덤 문자열>
```

앱을 테스트하고 싶은 경우 다음의 몽고DB URL을 이용하세요.

- mongodb+srv://elice:W8RsZsSX2Xs1ydE4@cluster0.4gz9ij3.mongodb.net/?retryWrites=true&w=majority

단, 해당 URL은 READ만 가능하며 회원 가입을 하거나 상품 정보를 추가하는 등의 동작은 할 수 없습니다. <br>
주어진 URL은 테스트 용이므로 실제 개발을 할 때는 해당 URL을 사용하지 않고, 반드시 직접 설치한 몽고DB의 URL을 사용하시기를 바랍니다.

4. express 앱을 실행

```bash
npm start
```

## 버전

### 1.0.0
