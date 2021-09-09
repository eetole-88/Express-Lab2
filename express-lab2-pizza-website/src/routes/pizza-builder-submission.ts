import express from "express";

const routes = express.Router();

// const price: number[] =[
//   {
//     priceSmall: 7 + toppingCount * 0.5,
//   },

// ]

routes.get("/pizza-builder-submission", (req, res) => {
  const size: string = req.query.size as string;
  const toppingCount: number = parseInt(req.query.toppingCount as string);
  const glutenFree: boolean = !!req.query.glutenFree;
  const specialInstructions: string = req.query.specialInstructions as string;
  let price: number = Number(req.query.price);
  const free = req.query.free as string;
  const isFreeDelivery = free === "yes";
  console.log(toppingCount);

  if (size === "small") {
    price = 7 + toppingCount * 0.5;
  } else if (size === "medium") {
    price = 10 + toppingCount * 1;
  } else if (size === "large") {
    price = 12 + toppingCount * 1.25;
  }
  if (glutenFree) {
    price += 2;
  }

  res.render("pizza-builder-submission", {
    size,
    toppingCount,
    glutenFree,
    specialInstructions,
    price,
    isFreeDelivery,
  });
  return price;
});

export default routes;
