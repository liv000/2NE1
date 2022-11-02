import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

export class OrderModel {
  async create(productInfo, userInfo) {
    const { address, phoneNumber, userId, fullName } = userInfo;
    return await Order.create({
      userId: userId,
      address: address,
      phoneNumber: phoneNumber,
      name: fullName,
      products: productInfo,
    });
  }
  async updateShippingStatus(orderId, status) {
    console.log(orderId);
    const currStatus = await Order.findOne({ _id: orderId });
    console.log(currStatus);
    if (currStatus.shipping !== "pending") {
      throw new Error(`배송 상태가 ${currStatus.shipping} 입니다.`);
    }
    // 특정 필드를 수정할 땐 set이라던데?
    return await Order.findOneAndUpdate({ _id: orderId }, { shipping: status });
  }
}
// 배열을 삽입할 땐 push 오퍼레이터를 사용하는 것이 아닌지?
const orderModel = new OrderModel();

export { orderModel };
