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
  async findOne(id) {
    return await Product.findOne({ _id: id }).populate('category');
  }

  async getProductList(categoryId) {
    if (categoryId === 'all') {
      const product = await Product.find({ status: 1 }).populate('category');
      return product;
    }

    const product = await Product.find({
      status: 1,
      category: categoryId,
    }).populate('category');
    return product;
  }

  async updateStock(productId, newQuantity) {
    // const { productId, quantity, productName } = product;

    // const currQuantity = await this.getQuantity(productId);
    // const newQuantity = currQuantity - quantity;
    // if (newQuantity < 0) {
    //   throw new Error(
    //     `${productName}의 재고가 부족합니다. 현재 수량 : ${currQuantity}`,
    //   );
    // }
    return await Product.findOneAndUpdate(
      { _id: productId },
      { stock: newQuantity },
    );
  }

  async getQuantity(productId) {
    const product = await this.findOne(productId);
    return product.stock;
  }

  async updateProduct(id, newInfo) {
    return await Product.findOneAndUpdate({ _id: id }, newInfo);
  }

  async setComments(id, author, content) {
    return await Product.updateOne(
      { _id: id },
      {
        $push: {
          comments: {
            content,
            author,
          },
        },
      },
    );
  }
}

const productModel = new ProductModel();

export { productModel };
