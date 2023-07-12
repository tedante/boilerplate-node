import * as config from "./config/app.js";
import express from "express";
import routes from "./routes/index.js";
import { connectDB } from "./config/database.js";
import { PORT } from "./config/app.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", routes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
