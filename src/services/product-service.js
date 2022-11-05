import { productModel } from '../db';
var cheerio = require('cheerio');
// var request = require('request');
const axios = require('axios');

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  async addProduct(productInfo) {
    return await this.productModel.create(productInfo);
  }

  async getProductList(topCategoryCode) {
    return await this.productModel.getProductList(topCategoryCode);
  }

  async setStock(products) {
    for (let i = 0; i < products.length; i++) {
      await this.productModel.updateStock(products[i]);
    }
  }
  async getProductDetail(name, id) {
    const productDetail = await this.productModel.findProductDetail(name);
    console.log;
    if (productDetail.id !== id) {
      throw new Error('상품명과 상품아이디 다름');
    }
    return productDetail;
  }
}

const productService = new ProductService(productModel);

export { productService };
