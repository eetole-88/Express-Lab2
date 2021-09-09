import express from "express";

const routes = express.Router();

routes.get("/specialty-pizzas", (req, res) => {
  const name = req.query.name;
  const price = req.query.price;
  res.render("specialty-pizzas", { name, price });
});

export default routes;
