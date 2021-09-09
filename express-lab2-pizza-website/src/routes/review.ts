import express from "express";

const routes = express.Router();

routes.get("/review", (req, res) => {
  res.render("review");
});

export default routes;
