import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
dotenv.config();
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import cors from 'cors'


const port = process.env.PORT || 4000;

connectDB();

const app = express();

app.use(cors());


app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);


const __dirname = path.resolve();

// pay attention to this.  This route places image in root file.
// See also Multer and the upload routes file.
app.use("/uploads", express.static(path.join(__dirname, '/uploads'))

)

app.get("/", (req, res) => {
  res.send("Server is Running")
});

app.use(notFound);
app.use(errorHandler);

// app.use((err, req, res, next) => {
//   res.status(500).send({ message: err.message });
// });

app.listen(port, () => 
   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`))

