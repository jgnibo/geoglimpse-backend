import { RequestHandler } from "express";
import { tileServices } from "../services";

const createTile: RequestHandler = async (req, res) => {
  try {
    const { indexedId, polygon } = req.body;
    const newTile = await tileServices.createTile({ indexedId, polygon });
    res.status(201).json(newTile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error', error: err });
  }
};

const tileController = {
  createTile,
}

export default tileController;