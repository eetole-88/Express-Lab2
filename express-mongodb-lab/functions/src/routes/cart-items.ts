import express from "express";
import { ObjectId } from "mongodb";
import { getClient } from "../db";
import Item from "../models/Item";

const routes = express.Router();

//GET  /cart-items

routes.get("/cart-items", async (req, res) => {
  const maxPrice: number = Number(req.query.maxPrice);
  const product: string = req.query.product as string;
  const pageSize: number = parseInt(req.query.pageSize as string);

  let query: any = {};
  if (!isNaN(maxPrice)) {
    query = { price: { $lte: maxPrice } };
  }
  if (product) {
    query = { product: product };
  }
  try {
    const client = await getClient();
    if (!isNaN(pageSize)) {
      const results = await client
        .db()
        .collection<Item>("cartItems")
        .find(query)
        .limit(pageSize)
        .toArray();
      res.json(results);
    } else {
      const results = await client
        .db()
        .collection<Item>("cartItems")
        .find(query)
        .toArray();
      res.json(results);
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET /cart-items by :id
routes.get("/cart-items/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const item = await client
      .db()
      .collection<Item>("cartItems")
      .findOne({ _id: new ObjectId(id) });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ messsage: "Internal Servor Error" });
  }
});

// POST /cart-items
routes.post("/cart-items", async (req, res) => {
  const item = req.body as Item;
  try {
    const client = await getClient();
    await client.db().collection<Item>("cartItems").insertOne(item);
    res.status(201).json(item);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Interval Servor Error" });
  }
});

// DELETE /cart-items/:id
routes.delete("/cart-items/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Item>("cartItems")
      .deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.status(204).end();
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Interval Servor Error" });
  }
});

// PUT /cart-items/:id
routes.put("/cart-items/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body as Item;
  delete data._id; // this removes _id from body so we only have one.
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Item>("cartItems")
      .replaceOne({ _id: new ObjectId(id) }, data);
    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "Not Found" });
    } else {
      data._id = new ObjectId(id);
      res.json(data);
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Interval Servor Error" });
  }
});
//**Extended Challenges */
routes.get("/products/highest-price", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<Item>("cartItems")
      .aggregate([{ $sort: { price: -1 } }, { $limit: 1 }])
      .toArray();
    res.json(results);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

routes.get("/products/best-sellers", async (req, res) => {
  try {
    const client = await getClient();
    const results = await client
      .db()
      .collection<Item>("cartItems")
      .aggregate([{ $sort: { quantity: -1 } }, { $limit: 5 }])
      .toArray();
    res.json(results);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default routes;
