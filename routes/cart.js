const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Cart = require("../models/Cart");
const router = require("express").Router();

// CREATE
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER CART
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const product = await Cart.findById(req.params.id);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(201).json("cart has been deleted!!");
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL
router.get("/carts", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(201).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
