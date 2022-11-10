import { orderService } from '../services';

const authComments = async (req, res, next) => {
  const { currentUserId } = req;
  const productId = req.params.id;

  const getOrderLog = await orderService.getOrderByUserId(
    currentUserId,
    productId,
  );

  if (!getOrderLog) {
    res.status(403).json({
      result: 'can not write comments',
      reason: '주문한 사람만 댓글을 작성 할 수 있습니다.',
    });
    return;
  }
  next();
};

export { authComments };
