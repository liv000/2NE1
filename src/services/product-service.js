import { productModel, userModel } from '../db';
import { setStock } from './components/setStock';
class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async addProduct(productInfo) {
    return await this.productModel.create(productInfo);
  }

  async getProductList(categoryId, page, perPage) {
    return await this.productModel.getProductList(categoryId, page, perPage);
  }

  async setStock(products) {
    for (let i = 0; i < products.length; i++) {
      await setStock(products[i]);
    }
  }
  async getProductDetail(id) {
    return await this.productModel.findOne(id);
  }

  async getComments(id) {
    const product = await this.getProductDetail(id);

    return await userModel.getAuthor(product.comments);
  }
  async updateProduct(id, newInfo) {
    const update = await this.productModel.updateProduct(id, newInfo);
    return update;
  }

  async findByCategoryId(categoryId) {
    return await this.productModel.getProductList(categoryId);
  }

  async setComments(id, author, content) {
    return await this.productModel.setComments(id, author, content);
  }
}

const productService = new ProductService(productModel);

export { productService };
