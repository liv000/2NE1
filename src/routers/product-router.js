import { Router } from 'express';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import {
  loginRequired,
  categoryHandler,
  contentType,
  authAdmin,
} from '../middlewares';

import { productService, userService } from '../services';

const productRouter = Router();
const asyncHandler = require('../utils/async-handler');

productRouter.post(
  '/admin/register',
  contentType,
  loginRequired,
  authAdmin,
  asyncHandler(async (req, res, next) => {
    const newProductInfo = req.body;

    const newProduct = await productService.addProduct(newProductInfo);

    res.status(201).json(newProduct);
  }),
);

productRouter.post(
  '/list',
  categoryHandler,
  asyncHandler(async (req, res, next) => {
    let { categoryId } = req.body;
    const newProduct = await productService.getProductList(categoryId);

    res.status(201).json(newProduct);
  }),
);

productRouter.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const item = await productService.getProductDetail(id);
    res.status(201).json(item);
  }),
);

productRouter.patch(
  '/admin/drop/:id',
  loginRequired,
  authAdmin,
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const drop = await productService.updateProduct(id, { status: 0 });
    res.status(201).json(drop); // todo 상품 삭제 완료 페이지로 이동 // 아니면 프론트에서 alert
  }),
);

productRouter.patch(
  '/admin/edit/:id',
  loginRequired,
  authAdmin,
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const newInfo = req.body;

    await productService.updateProduct(id, newInfo);
    res.redirect(`${id}`);
  }),
);

// todo 댓글 작성 : 구매한 사람만 작성할 수 있다.
productRouter.post(
  '/:id/comments',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = req.currentUserId;
    const { content } = req.body;
    const author = await userService.getUser(user);

    const newComment = await productService.setComments(id, author, content);
    res.status(201).json({ '댓글 등록 성공': newComment });
  }),
);

// productRouter.get('/:id/comments', asyncHandler(async(req,res,next)=>{
// const { id} = req.params;
// const
// }));

export { productRouter };
