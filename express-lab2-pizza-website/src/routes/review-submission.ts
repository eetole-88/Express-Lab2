import express from "express";

const routes = express.Router();

routes.post("/review-submission", (req, res) => {
  const name: string = req.body.name;
  const comment: string = req.body.comment;
  const rating: string[] =
    typeof req.body.rating === "string"
      ? [req.body.rating]
      : req.body.rating || [];
  res.render("review-submission", { name, comment, rating });
});

export default routes;
