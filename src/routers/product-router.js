import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';

import { productService } from '../services';
const productRouter = Router();
const asyncHandler = require('../utils/async-handler');

// 상품 등록
productRouter.post(
  '/register',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요',
      );
    }

    if (req.role === 0) {
      throw new Error('관리자만 상품을 추가 할 수 있습니다.');
    }
    const { title, type, price, summery } = req.body;

    const newProduct = await productService.addProduct({
      title,
      type,
      price,
      summery,
    });

    res.status(201).json(newProduct);
  }),
);

//카테고리별 상품 조회 및 전체 상품 조회
productRouter.get(
  '/productlist', 
  async function (req, res, next) {
  try {
    //카테고리를 바디에 담아서 가져옴
    const {categoryCode} = req.body;

    const newProduct = await productService.getProductList(categoryCode);

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});


// todo
// 상품삭제, 상품수정

export { productRouter };
