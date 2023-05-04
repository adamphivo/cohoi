import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import express, { NextFunction, Response, Request } from "express";
import cors from "cors";
import { Cohoi } from "./services/cohoi";

const app = express();
const cohoi = new Cohoi();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/randomItem", async function (req: Request, res: Response, next: NextFunction) {
  try {
    const data = await cohoi.getRandomSound();
    res.json(data);
  } catch (e) {
    next(e);
  }
});

app.use(function (err: Error, req: Request, res: Response, next: NextFunction): void {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
