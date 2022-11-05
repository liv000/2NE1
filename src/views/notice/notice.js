// 노티스는 일단 css 적용이 안되니,, js 구성 방법을 생각해보자
// 고객센터 누르면 고객센터 페이지, 공지사항은 공지사항, QNA는 QNA로 이동
// 이동할때마다 해당 페이지의 이름으로 h2 부분이 바뀌어야 함
// h1의 경우도 마찬가지~~
// 고객센터 QNA의 경우 공지사항 홈피를 복붙하되 table의 내용만 바꿈
// 관리자가 등록한대로 분류, 제목, 작성일이 바뀌어야 함
// 새로 등록한 공지의 경우 옆에 (New)가 뜸
// 작성일은 해당 날짜가 그대로 쓰임
// POST 부분 보고 작성하면 될듯하다.

// 분류==지정한 분류가 되도록
// 제목==작성한 제목
// 작성일==현재날짜

// 이건진짜 POST도 다시 봐야겟다,, 내가 어디까지 해야하는건지 몰겟당!!

// 일단 엘리스 7주차 실습2의 app.js 복붙함

// 아직 수정 중 입니다. 수정 완료 시 위 내용 지울 예쩡,,
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const dayjs = require('dayjs');

const indexRouter = require('./routes');
const postsRouter = require('./routes/posts');

mongoose.connect('mongodb://localhost:27017/simple-board');

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected');
});

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.formatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/posts', postsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
