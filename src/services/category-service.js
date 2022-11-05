import { categoryModel } from '../db';

class CategoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async addCategory(category) {
    const { categoryName, categoryCode } = category;
    const hasCategory = await this.categoryModel.hasCategory(
      categoryName,
      categoryCode,
    );
    if (hasCategory) {
      throw new Error('이미 존재하는 카테고리 입니다. ');
    }
    return await this.categoryModel.create(category);
  }

  async getCategoryList() {
    return await this.categoryModel.getCategoryList();
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
