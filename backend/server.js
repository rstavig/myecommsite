import express from "express";
import dotenv from "dotenv";
import path from "path";
// import colors from "colors";
import connectDB from "./config/db.js";
// import mongoose from "mongoose";
import productRouter from "./routers/productRouter.js";
import userRouter from "./routers/userRouter.js";
import orderRouter from "./routers/orderRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// mongoose.connect("mongodb://localhost:27017/bobazon", {
// useNewUrlParser: true,
// useUnifiedTopology: true,
// });

// app.get("/api/users", (req, res) => {
//   res.send(data.users);
// });

app.use("/api/uploads", uploadRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
);
} else {
  app.get("/", (req, res) => {
    res.send("Server is Running")
  });

}

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
