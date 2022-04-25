const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
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

app.listen(8081, () => console.log("listening on port 8080"));
