import { Router } from "express";
import is from "@sindresorhus/is";
import { loginRequired } from "../middlewares";

import { shippingService } from "../services";
const shippingRouter = Router();
const asyncHandler = require("../utils/async-handler");

// 배송 status : pending, shipped, canceled 중 하나만 와야한다.
// 배송상태 수정
// 관리자만 가능
shippingRouter.patch(
  "/edit",
  loginRequired,
  asyncHandler(async (req, res, next) => {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    if (req.role === 0) {
      throw new Error("배송상태는 관리자만 업데이트 가능합니다. ");
    }

    // const { orderId } = req.params;
    const { orderId, status } = req.body;
    const updateShipping = await shippingService.update(orderId, status);

    res.status(201).json(updateShipping);
  })
);

// todo 주문을 취소하면 pending상태의 배송은 캔슬되어야함
export { shippingRouter };
