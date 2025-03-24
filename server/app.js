import express from "express";
import { getproductDetail, getproducts } from "./api/products.js"; // Ensure this matches the function in products.js
import Redis from "ioredis";

const app = express();

export const redis = new Redis({
  host: "redis-17239.c301.ap-south-1-1.ec2.redns.redis-cloud.com",
  port: 17239,
  password: "nuPgZO9QjjnzvIeflwrB4rm7Dv9ZLcPB",
});

redis.on("connect", () => {
  console.log("Redis connected");
});

app.get("/", (req, res) => {
  res.send("hello saurabh");
});

app.get("/products", async (req, res) => {
  try {
    const isExist = await redis.exists("products");
    if (isExist) {
      console.log("Get from cache");
      const products = await redis.get("products");
      return res.json({
        products: JSON.parse(products),
      });
    }

    const products = await getproducts();
    await redis.set("products", JSON.stringify(products.products));

    res.json({
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/product/:id", async (req, res) => {
  const id = req.params.id;
  const key = `product:${id}`;

  let product = await redis.get(key);
  if (product)
    return res.json({
      product: JSON.stringify(product),
    });

  product = await getproductDetail(id);
  await redis.set(key, JSON.stringify(product));

  res.json({
    product,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000"); // Fixed typo here
});
