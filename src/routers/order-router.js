import { Router } from "express";
import is from "@sindresorhus/is";
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from "../middlewares";

import { orderService } from "../services";
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

    const { products, address, phoneNumber } = req.body;

    const fullName = req.currentUserId;

    const userInfo = { address, phoneNumber, fullName };

    const newOrder = await orderService.order(products, userInfo);

    res.status(201).json(newOrder);
  })
);

export { orderRouter };
