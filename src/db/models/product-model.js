import { model } from 'mongoose';
import { ProductSchema } from '../schemas/product-schema';

const Product = model('products', ProductSchema);

export class ProductModel {
  async create(productInfo) {
    return await Product.create(productInfo);
  }
  async insert(data) {
    return await Product.create(data);
  }

  async getProductList(topCategoryCode) {
    if (topCategoryCode === undefined) {
      const product = await Product.find({ status: 1 });
      return product;
    }

    const product = await Product.find({ topCategoryCode, status: 1 });
    return product;
  }

  async updateStock(product) {
    const { productId, quantity, productName } = product;
    console.log(product);
    const currQuantity = await this.getQuantity(productId);
    const newQuantity = currQuantity - quantity;
    if (newQuantity < 0) {
      throw new Error(
        `${productName}의 재고가 부족합니다. 현재 수량 : ${currQuantity}`,
      );
    }
    return await Product.findOneAndUpdate(
      { _id: productId },
      { stock: newQuantity },
    );
  }

  async getQuantity(productId) {
    const product = await Product.findOne({ _id: productId });
    return product.stock;
  }
}

const productModel = new ProductModel();

export { productModel };
