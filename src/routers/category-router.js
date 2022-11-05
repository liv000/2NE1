import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired, categoryHandler } from '../middlewares';

import { categoryService } from '../services';
const categoryRouter = Router();
const asyncHandler = require('../utils/async-handler');

// 카테고리 등록
categoryRouter.post(
  '/register',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const newCategoryInfo = req.body;

    const newCategory = await categoryService.addCategory(newCategoryInfo);

    res.status(201).json(newCategory);
  }),
);
// 전체 카테고리 조회
categoryRouter.get('/list', async function (req, res, next) {
  try {
    const newCategory = await categoryService.getCategoryList();

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

export { categoryRouter };
