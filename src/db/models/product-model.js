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

  //추가
  async getProductList(topCategoryCode) {
    //body에 아무것도 담겨져 있지 않으면(undefind) 상품 전체목록 불러옴
    if (topCategoryCode === undefined) {
      const product = await Product.find();
      return product;
    }

    const product = await Product.find({ topCategoryCode });
    return product;
  }

  async updateStock(product) {
    const { productId, quantity } = product;
    const currQuantity = await this.getQuantity(productId);
    const newQuantity = currQuantity - quantity;
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
