import { model } from 'mongoose';
import { OrderSchema } from '../schemas/order-schema';
const ship = require('../../utils/shippingStatus');

const Order = model('orders', OrderSchema);

export class OrderModel {
  async create(productInfo, userInfo) {
    const { address, phoneNumber, userId, fullName, totalAmount } = userInfo;
    return await Order.create({
      userId: userId,
      address: address,
      phoneNumber: phoneNumber,
      name: fullName,
      products: productInfo,
      totalAmount: totalAmount,
    });
  }
  async updateShippingStatus(orderId, status) {
    const currStatus = await this.getStatus(orderId);

    if (currStatus === ship.CANCELED) {
      throw new Error(`배송 상태가 ${currStatus} 입니다.`);
    }

    if (currStatus === 'shipped' && status === 'canceled') {
      throw new Error('취소 불가 : 이미 배송이 시작되었습니다.');
    }
    // 특정 필드를 수정할 땐 set이라던데?
    return await Order.findOneAndUpdate({ _id: orderId }, { shipping: status });
  }

  async getStatus(orderId) {
    const status = await Order.findOne({ _id: orderId });
    return status.shipping;
  }

  async getOrderUser(orderId) {
    const user = await Order.findOne({ _id: orderId }).populate('userId');
    return user.userId;
  }

  async updateOrder(orderId, newInfo) {
    const currStatus = await this.getStatus(orderId);

    if (currStatus === 'shipped') {
      throw new Error('취소 불가 : 이미 배송이 시작되었습니다.');
    }

    return await Order.findOneAndUpdate({ _id: orderId }, newInfo);
  }

  async getOrderList(orderId) {
    return await Order.findOne({ _id: orderId });
  }

  async hasOrder(userId) {
    const getOrder = await Order.find({
      userId: userId,
      shipping: { $in: ['pending', 'shipping'] },
    }).populate('userId');

    return getOrder.length >= 1;
  }

  async getAllOrderList() {
    return Order.find({});
  }

  async getOrderByUserId(userId, productId) {
    const orderLogList = await Order.find({ userId });

    const isOrdered = orderLogList.find(
      (orderLog) => orderLog.products[0].productId === productId,
    );

    return isOrdered;
  }
}

const orderModel = new OrderModel();

export { orderModel };
