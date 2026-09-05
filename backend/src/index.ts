import express from "express";
import restaurantsRouter from "./routes/restaurants.js";
import foodItemsRouter from "./routes/foodItems.js";

const app = express();
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});
app.use("/api/restaurants", restaurantsRouter);
app.use("/api/foodItems", foodItemsRouter);

app.listen(4000, () => {
  console.log(`Server running on http://localhost:4000`);
});