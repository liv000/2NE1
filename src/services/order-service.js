import { Cursor } from 'mongoose';
import { orderModel, userModel } from '../db';

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  async order(productInfo, userInfo) {
    userInfo.totalAmount = await this.getTotalAmount(productInfo);
    return await this.orderModel.create(productInfo, userInfo);
  }

  async getTotalAmount(productInfo) {
    const totalAmount = productInfo.reduce((acc, cur) => {
      return acc + cur.productPrice * cur.quantity;
    }, 0);
    return totalAmount;
  }

  async updateOrder(userId, orderId, newInfo) {
    const userCheck = await this.checkUser(userId, orderId);
    if (!userCheck) {
      throw new Error('주문자만 주문을 수정할 수 있습니다.');
    }
    return await this.orderModel.updateOrder(orderId, newInfo);
  }

  async checkUser(userId, orderId) {
    const user = await userModel.findById(userId);
    const orderUser = await this.orderModel.getOrderUser(orderId);
    return user.id === orderUser.id;
  }

  async getOrderList(orderId) {
    return await orderModel.getOrderList(orderId);
  }

  async hasOrder(userId) {
    return await orderModel.hasOrder(userId);
  }

  async getAllOrderList() {
    return await orderModel.getAllOrderList();
  }

  async getOrderByUserId(userId, productId) {
    return await orderModel.getOrderByUserId(userId, productId);
  }
}

const orderService = new OrderService(orderModel);

export { orderService };
