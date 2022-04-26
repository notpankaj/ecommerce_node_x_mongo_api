const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
require("dotenv").config();
const atlasUri =
  "mongodb+srv://pankaj:12345@cluster0.1q8on.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();
mongoose
  .connect(atlasUri)
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(8081, () => console.log("listening on port 8080"));
