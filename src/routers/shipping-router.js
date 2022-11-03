import { Router } from 'express';
import is from '@sindresorhus/is';
import { loginRequired } from '../middlewares';

import { shippingService } from '../services';
const shippingRouter = Router();
const asyncHandler = require('../utils/async-handler');

// 배송 status : pending, shipping, shipped, canceled 중 하나만 와야한다.
// 배송상태 수정
// 관리자만 가능
shippingRouter.patch(
  '/edit',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    if (req.role === 0) {
      throw new Error('배송상태는 관리자만 업데이트 가능합니다. ');
    }

    const { orderId, status } = req.body;
    const updateShipping = await shippingService.update(orderId, status);

    // #1 전체 배송 상태로 리다이렉트
    res.status(201).json(updateShipping);
  }),
);

// #1 전체 상품 배송 상태 (관리자 기능)

export { shippingRouter };
