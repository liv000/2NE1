import { Router } from 'express';

// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import {
  loginRequired,
  validCallNumberCheck,
  authAdmin,
  contentType,
} from '../middlewares';

import { orderService, shippingService, productService } from '../services';
const orderRouter = Router();
const asyncHandler = require('../utils/async-handler');

orderRouter.post(
  '/',
  loginRequired,
  contentType,
  validCallNumberCheck,
  asyncHandler(async (req, res, next) => {
    const { products, ...rest } = req.body;

    const userId = req.currentUserId;
    rest.userId = userId;
    const orderInfo = rest;

    await productService.setStock(products);
    const newOrder = await orderService.order(products, orderInfo);

    res.status(201).json(newOrder);
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

orderRouter.get(
  '/admin/list',
  loginRequired,
  authAdmin,
  asyncHandler(async (req, res, next) => {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 5);
    const getAllOrder = await orderService.getAllOrderList(page, perPage);
    res.status(201).json(getAllOrder);
  }),
);

export { orderRouter };
