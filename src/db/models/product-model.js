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
  async findByCategoryCode(topCategoryCode) {
    const product = await Product.find(topCategoryCode);
    return product;
  }

}

const productModel = new ProductModel();

export { productModel };
