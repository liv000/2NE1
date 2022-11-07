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
    if (hasCategory.length >= 1) {
      throw new Error('이미 존재하는 카테고리 입니다. ');
    }
    return await this.categoryModel.create(category);
  }

  async getCategoryList() {
    return await this.categoryModel.getCategoryList();
  }

  async updateCategory(newInfo) {
    const { categoryName, categoryCode, categoryId } = newInfo;
    const hasCategory = await this.categoryModel.hasCategory(
      categoryName,
      categoryCode,
      categoryId,
    );

    if (hasCategory.length >= 1) {
      throw new Error('이미 존재하는 카테고리 입니다. ');
    }
    const category = await this.categoryModel.getCategory(categoryCode);

    if (!category || category.length > 1) {
      throw new Error(
        '카테고리 개수 오류 한개의 카테고리만 변경할 수 있습니다',
      );
    }

    return await this.categoryModel.updateCategory(newInfo);
  }

  async dropCategory(categoryId) {
    const newInfo = { categoryId, status: 0 };
    return await this.updateCategory(newInfo);
  }
}

const categoryService = new CategoryService(categoryModel);

export { categoryService };
