import { model } from "mongoose";
import { OrderSchema } from "../schemas/order-schema";

const Order = model("orders", OrderSchema);

export class OrderModel {
  async create(productInfo, userInfo) {
    const { address, phoneNumber, fullName } = userInfo;
    return await Order.create({
      fullName: fullName,
      address: address,
      phoneNumber: phoneNumber,
      $push: {
        products: { productInfo },
      },
    });
  }
}

const orderModel = new OrderModel();

export { orderModel };
