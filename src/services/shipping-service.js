import { orderModel } from "../db";

class ShippingService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  async update(orderId, status) {
    return await this.orderModel.updateShippingStatus(orderId, status);
  }
}

const shippingService = new ShippingService(orderModel);

export { shippingService };
