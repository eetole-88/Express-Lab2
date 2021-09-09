import express from "express";

const routes = express.Router();

routes.get("/pizza-builder", (req, res) => {
  const toppings = [
    "Pepperoni",
    "Sausage",
    "Chicken",
    "Mushroom",
    "Olive",
    "Green Pepper",
    "Onion",
    "Banana Pepper",
    "Anchovies",
    "Pineapple",
  ];

  res.render("pizza-builder", {
    toppings,
  });
});

export default routes;
