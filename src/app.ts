import express from "express";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";
import { errorMiddleware } from "./middleware/error.middleware";
import cors from "cors";
import "dotenv/config";

const app = express();

console.log(process.env.DATABASE_URL)

app.use(cors())
app.use(express.json());

app.use("/products", productRoutes)
app.use("/orders", orderRoutes)

app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
    console.log("Server is running on port "+process.env.PORT);
});

