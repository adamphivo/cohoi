import type { Request, Response, NextFunction } from "express";
import { Cohoi } from "../services/cohoi";

class Controller {
  public cohoi: Cohoi;

  constructor() {
    this.cohoi = new Cohoi();
    this.getRandomItem = this.getRandomItem.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  public async getRandomItem(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.cohoi.getRandomTrack();
      res.json(data);
    } catch (e) {
      next(e);
    }
  }

  public async handleError(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    res.status(500).send();
  }
}

export default new Controller();
