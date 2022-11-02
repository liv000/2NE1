import { orderModel } from "../db";

class OrderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  async order(productInfo, userInfo) {
    return await this.orderModel.create(productInfo, userInfo);
  }

}

const orderService = new OrderService(orderModel);

export { orderService };
