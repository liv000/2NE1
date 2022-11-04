import { productModel } from '../db';

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async addProduct(productInfo) {
    return await this.productModel.create(productInfo);
  }

  //상품목록 불러오기 관련
  async getProductList(topCategoryCode) {
    return await this.productModel.getProductList(topCategoryCode);
  }

  async setStock(products) {
    for (let i = 0; i < products.length; i++) {
      await this.productModel.updateStock(products[i]);
    }
  }
}

const productService = new ProductService(productModel);

export { productService };
