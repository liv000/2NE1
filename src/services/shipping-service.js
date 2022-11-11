import { orderModel, userModel } from '../db';
const constants = require('../constraint/shippingStatus');
class ShippingService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  async update(orderId, status) {
    return await this.orderModel.updateShippingStatus(orderId, status);
  }

  async cancelOrder(orderId, userId, role) {
    if (role === 0) {
      // 관리자는 다 주문 삭제 할 수 있다.
      const user = await userModel.findById(userId);
      const orderUser = await this.orderModel.getOrderUser(orderId);
      if (!user) {
        throw new Error('유저정보가 올바르지 않습니다.');
      }

      if (user.id !== orderUser.id) {
        throw new Error('주문자만 주문 취소를 할 수 있습니다.');
      }
    }

    const [orderCancel, shippingCancel] = await Promise.all([
      this.orderModel.updateOrder(orderId, { status: 0 }),
      this.orderModel.updateShippingStatus(orderId, constants.CANCELED),
    ]);
    return orderCancel;
  }
}

const shippingService = new ShippingService(orderModel);

export { shippingService };
