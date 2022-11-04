import { productModel } from "../db";

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async addProduct(productInfo) {
    return await this.productModel.create(productInfo);
  }

  async findByCategoryCode(topCategoryCode) {
    return await this.Product.find(topCategoryCode);   
  }
}

const productService = new ProductService(productModel);

export { productService };