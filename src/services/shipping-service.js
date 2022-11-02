import { orderModel,UserModel,userModel } from "../db";

class ShippingService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  async update(orderId, status) {
    return await this.orderModel.updateShippingStatus(orderId, status);
  }
  async cancelOrder(orderId, userId){

  const user = await userModel.findById(userId);
  const orderUser = await this.orderModel.getOrderUser(orderId);

  if (user.id !== orderUser.id){
    throw new Error("주문자만 주문 취소를 할 수 있습니다.")
  }
  
  return await this.orderModel.updateShippingStatus(orderId, "canceled");
  }
}

const shippingService = new ShippingService(orderModel);

export { shippingService };
