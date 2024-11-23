const Cart = require("../../models/Cart");

const removecart = async (req, res, next) => {
  const productId = req.query.productId;

  try {
    const finddedCart = await Cart.findOne({
      user: req.userId,
      product: productId,
    }).populate([
      {
        path: "product",
      },
    ]);

    if (finddedCart.quantity > 1) {
      finddedCart.quantity--;
      finddedCart.cartTotal =
        finddedCart.cartTotal - finddedCart.product.sale_price;
      await finddedCart.save();
    } else {
      await Cart.findOneAndDelete({ user: req.userId, product: productId });
    }

    res.status(200).json({ message: "item removed from cart", status: true });
  } catch (error) {
    next(error);
  }
};

module.exports = removecart;
