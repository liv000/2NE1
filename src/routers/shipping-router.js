import { Router } from 'express';
import { loginRequired, contentType, authAdmin } from '../middlewares';

import { shippingService } from '../services';
const shippingRouter = Router();
const asyncHandler = require('../utils/async-handler');

// 배송 status : pending, shipping, shipped, canceled 중 하나만 와야한다.
shippingRouter.patch(
  '/edit',
  contentType,
  loginRequired,
  authAdmin,
  asyncHandler(async (req, res, next) => {
    const { orderId, status } = req.body;

    const updateShipping = await shippingService.update(orderId, status);

    // #1 전체 배송 상태로 리다이렉트
    res.status(201).json(updateShipping);
  }),
);

// #1 전체 상품 배송 상태 (관리자 기능)

export { shippingRouter };

