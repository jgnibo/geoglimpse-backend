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

const getTiles: RequestHandler = async (req, res) => {
  try {
    const tiles = await tileServices.getTiles();
    res.status(200).json(tiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const getTileById: RequestHandler = async (req, res) => {
  try {
    const { tileId } = req.params;
    const tile = await tileServices.getTileById(tileId);
    res.status(200).json(tile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const getTileByIndexedId: RequestHandler = async (req, res) => {
  try {
    const { indexedId } = req.params;
    const tile = await tileServices.getTileByIndexedId(Number(indexedId));
    res.status(200).json(tile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const updateTile: RequestHandler = async (req, res) => {
  try {
    const { tileId } = req.params;
    const tileData = req.body;
    const updatedTile = await tileServices.updateTile(tileId, tileData);
    res.status(200).json(updatedTile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const deleteTile: RequestHandler = async (req, res) => {
  try {
    const { tileId } = req.params;
    const deletedTile = await tileServices.deleteTile(tileId);
    res.status(200).json(deletedTile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const deleteAllTiles: RequestHandler = async (req, res) => {
  try {
    const deletedTiles = await tileServices.deleteAllTiles();
    res.status(200).json(deletedTiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const tileController = {
  createTile,
  getTiles,
  getTileById,
  getTileByIndexedId,
  updateTile,
  deleteTile,
  deleteAllTiles
}

export default tileController;