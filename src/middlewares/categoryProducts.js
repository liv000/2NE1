import { productService } from '../services';

const categoryProducts = async (req, res, next) => {
  const categoryId = req.body.categoryId;
  const hasProducts = await productService.findByCategoryId(categoryId);

  if (hasProducts.length >= 1) {
    res.status(403).json({
      result: 'hasProducts',
      reason: '해당 카테고리에 등록된 상품이 있습니다.',
    });
    return;
  }
  next();
};

export { categoryProducts };
