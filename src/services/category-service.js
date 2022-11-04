import { categoryModel } from "../db";

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async addCategory(categoryName) {

    return await this.categoryModel.create(categoryName);
  }

  //상품목록 불러오기 관련
  async getCategoryList() {
    return await this.categoryModel.getCategoryList();   
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };