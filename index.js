require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const getConnection = require("./utils/getConnection");
const errorHandler = require("./middlewares/errorHandler");
const galaryRoutes = require("./routes/galary");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/products");
const path = require("path");
const brandRoutes = require("./routes/brands");
const dropdownRoutes = require("./routes/dropdown");
const reviewsRoutes = require("./routes/reivews");
const accountRoutes = require("./routes/account");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/user", accountRoutes);
app.use("/image", galaryRoutes);
app.use("/brand", brandRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/dropdown", dropdownRoutes);
app.use("/review", reviewsRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);

app.use(errorHandler);
getConnection();
app.listen(process.env.PORT, () =>
  console.log(`server is listening on port: ${process.env.PORT}`)
);
