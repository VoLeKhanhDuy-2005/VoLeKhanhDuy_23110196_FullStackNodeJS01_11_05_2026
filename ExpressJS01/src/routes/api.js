const express = require("express");
const {
  createUser,
  handleLogin,
  getUser,
  getAccount,
  getCurrentUser,
} = require("../controllers/userController");
const {
  searchProducts,
  getHomePageProducts,
} = require("../controllers/productController")
const { getActivePromotions } = require("../controllers/promotionController");
const auth = require("../middleware/auth");
const delay = require("../middleware/delay");

const routerAPI = express.Router();

routerAPI.all(/(.*)/, auth);// (.*) phiên bản mới

routerAPI.get("/", (req, res) => {
  return res.status(200).json("Hello world api");
});

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);

routerAPI.get("/user", getUser);
routerAPI.get("/user/me", getCurrentUser);
routerAPI.get("/account", delay, getAccount);

routerAPI.get("/products", getHomePageProducts)
routerAPI.get("/promotions/active", getActivePromotions);

module.exports = routerAPI; //export default
