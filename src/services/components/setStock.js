import { productModel } from '../../db';
const setStock = async (product) => {
  const { productId, quantity, productName } = product;
  const currQuantity = await productModel.getQuantity(productId);
  const newQuantity = currQuantity - quantity;
  if (newQuantity < 0) {
    throw new Error(
      `${productName}의 재고가 부족합니다. 현재 수량 : ${currQuantity}`,
    );
  }
  await productModel.updateStock(productId, newQuantity);
};

export { setStock };
