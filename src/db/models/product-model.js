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

  async getProductList(categoryId, page, perPage) {
    if (categoryId === 'all') {
      const [total, product] = await Promise.all([
        Product.countDocuments({}),
        Product.find({ status: 1 })
          .skip(perPage * (page - 1))
          .limit(perPage)
          .sort({ createdAt: 1 })
          .populate('category'),
      ]);
      const totalPage = Math.ceil(total / perPage);
      return { totalPage, page, perPage, product };
    }

    const [total, product] = await Promise.all([
      Product.countDocuments({}),
      Product.find({ status: 1, category: categoryId })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .sort({ createdAt: 1 })
        .populate('category'),
    ]);
    const totalPage = Math.ceil(total / perPage);
    return { totalPage, page, perPage, product };
  }

  async updateStock(productId, newQuantity) {
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
