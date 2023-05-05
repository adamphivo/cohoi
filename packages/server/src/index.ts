import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express from "express";
import cors from "cors";
import Controller from "./controller";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/randomItem", Controller.getRandomItem);

app.use(Controller.handleError);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
