import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares";

import { orderService, shippingService } from "../services";
const orderRouter = Router();
const asyncHandler = require("../utils/async-handler");

// 주문하기
// 바디에 상품 아이디와 상품 개수
// 잔여 상품 카운트 할 지 ?
orderRouter.post(
  "/",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    const { products, address, phoneNumber, fullName } = req.body;

    const userId = req.currentUserId;

    const userInfo = { address, phoneNumber, userId, fullName };

    const newOrder = await orderService.order(products, userInfo);
    // 배송 생성
    // await shippingService.create(newOrder.id);
    res.status(201).json(newOrder);
  })
);

// 주문 취소
orderRouter.patch(
  "/",
  loginRequired,
  asyncHandler(async (req, res) => {})
);

export { orderRouter };
