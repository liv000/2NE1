import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

export class OrderModel {
  async create(productInfo, userInfo) {
    console.log(productInfo, userInfo);
    const { address, phoneNumber, userId, fullName } = userInfo;
    return await Order.create({
      userId: userId,
      address: address,
      phoneNumber: phoneNumber,
      name: fullName,
      products: productInfo,
    });
  }
}
// 배열을 삽입할 땐 push 오퍼레이터를 사용하는 것이 아닌지?
const orderModel = new OrderModel();

export { orderModel };
