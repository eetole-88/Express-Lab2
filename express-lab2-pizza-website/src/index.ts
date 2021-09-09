// require the express module
import express from "express";
import path from "path";

// require the cors module
import cors from "cors";
import homepageRoutes from "./routes/homepage";
import specialtyRoutes from "./routes/specialty-pizzas";
import reviewRoutes from "./routes/review";
import submissionRoutes from "./routes/review-submission";
import builderRoutes from "./routes/pizza-builder";
import builderSubmissionRoutes from "./routes/pizza-builder-submission";

// creates an instance of an Express server
const app = express();

// Settings for web server
app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));

// enable Cross Origin Resource Sharing so this API can be used from web-apps on other domains
app.use(cors());

// allow POST and PUT requests to use JSON bodies
app.use(express.json());

app.use("/", homepageRoutes);
app.use("/", specialtyRoutes);
app.use("/", reviewRoutes);
app.use("/", submissionRoutes);
app.use("/", builderRoutes);
app.use("/", builderSubmissionRoutes);

// define the port
const port = 3001;

// run the server
app.listen(port, () => console.log(`Listening on port: ${port}.`));
