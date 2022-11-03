import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired, validCallNumberCheck } from '../middlewares';
import { userModel } from '../db';
import { orderService, shippingService, userService } from '../services';
const orderRouter = Router();
const asyncHandler = require('../utils/async-handler');

// 주문하기
// 바디에 상품 아이디와 상품 개수
// 잔여 상품 카운트 할 지 ?
orderRouter.post(
  '/',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    const { products, ...rest } = req.body;

    const userId = req.currentUserId;
    rest.userId = userId;
    const orderInfo = rest;

    const newOrder = await orderService.order(products, orderInfo);

    res.status(201).json(newOrder);
    res.render('주문 완료 페이지로 이동'); // todo
  }),
);

// 주문 취소 (= 배송 취소)
orderRouter.patch(
  '/cancel',
  loginRequired,
  asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    const userId = req.currentUserId;

    const cancelOrder = await shippingService.cancelOrder(orderId, userId);
    res.status(201).json(cancelOrder);
  }),
);

// 주문 수정
// 사용자는 주문 완료 후 배송이 시작되기 전까지 주문 정보를 수정할 수 있다.
// 주문 수정은 주문한 사람만 가능하다.
// 수정할 수 있는 것 -> 주소, 핸드폰 번호, 주문자 이름같은 주문 정보
// 상품 정보는 수정 할 수 없음
orderRouter.patch(
  '/edit',
  loginRequired,
  validCallNumberCheck,
  asyncHandler(async (req, res) => {
    const { orderId, ...rest } = req.body;
    const newInfo = rest;

    const userId = req.currentUserId;

    await orderService.updateOrder(userId, orderId, newInfo);

    res.redirect(`${orderId}`);
  }),
);

// 주문 정보 보기
orderRouter.get(
  '/:orderId',
  asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const result = await orderService.getOrderList(orderId);
    res.status(201).json(result);
  }),
);
export { orderRouter };
