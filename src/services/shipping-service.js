import { orderModel, userModel } from '../db';

class ShippingService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  async update(orderId, status) {
    return await this.orderModel.updateShippingStatus(orderId, status);
  }

  async cancelOrder(orderId, userId) {
    // 유저체크하는거 모듈로 빼기
    const user = await userModel.findById(userId);
    const orderUser = await this.orderModel.getOrderUser(orderId);

    if (user.id !== orderUser.id) {
      throw new Error('주문자만 주문 취소를 할 수 있습니다.');
    }

    return await this.orderModel.updateShippingStatus(orderId, 'canceled');
  }
}

const shippingService = new ShippingService(orderModel);
/////sdfsdfsdf/sdfsdf
export { shippingService };
