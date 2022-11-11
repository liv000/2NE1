import { Router } from 'express';
import { loginRequired, contentType, authAdmin } from '../middlewares';

import { shippingService } from '../services';
const shippingRouter = Router();
const asyncHandler = require('../utils/async-handler');

shippingRouter.patch(
  '/admin/edit',
  contentType,
  loginRequired,
  authAdmin,
  asyncHandler(async (req, res, next) => {
    const { orderId, status } = req.body;

    const updateShipping = await shippingService.update(orderId, status);

    res.status(201).json(updateShipping);
  }),
);

export { shippingRouter };
