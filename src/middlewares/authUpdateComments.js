import { productService } from '../services';

const authUpdateComments = async (req, res, next) => {
  const { currentUserId } = req;

  const { commentId, id } = req.params;

  const isAuthor = await productService.isAuthor(currentUserId, commentId, id);
  if (!isAuthor) {
    res.status(403).json({
      result: 'can not update comments',
      reason: '댓글 작성자만 댓글을 작성 할 수 있습니다.',
    });
    return;
  }
  req.commentId = commentId;
  req.productId = id;

  next();
};

export { authUpdateComments };
