import Tile from "../models/tile_model";
import { IPoint, ITile } from "../utils/types";

const createTile = async (tileData: ITile) => {
  try {
    const tile = new Tile(tileData);
    await tile.save();
    return tile;
  } catch (error) {
    throw new Error(`Error creating tile: ${error}`);
  }
};

const getTiles = async () => {
  try {
    const tiles = await Tile.find();
    return tiles;
  } catch (error) {
    throw new Error(`Error getting tiles: ${error}`);
  }
}

const getTileById = async (tileId: string) => {
  try {
    const tile = await Tile.findById(tileId);
    return tile;
  } catch (error) {
    throw new Error(`Error getting tile by tileId: ${error}`);
  }
}

const getTileByIndexedId = async (indexedId: number) => {
  try {
    const tile = await Tile.find({ indexedId });
    return tile;
  } catch (error) {
    throw new Error(`Error getting tile by indexedId: ${error}`);
  }
}

const findIntersectingTile = async (locationPoint: IPoint) => {
  try {
    const tile = await Tile.findOne({
      polygon: {
        $geoIntersects: {
          $geometry: {
            type: "Point",
            coordinates: locationPoint.coordinates
          }
        }
      }
    });
    return tile;
  } catch (error) {
    throw new Error(`Error finding intersecting tile: ${error}`);
  }
}

const updateTile = async (tileId: string, tileData: ITile) => {
  try {
    const tile = await Tile.findByIdAndUpdate(tileId, tileData);
    return tile
  } catch (error) {
    throw new Error(`Error updating tile: ${error}`);
  }
}

const deleteTile = async (tileId: string) => {
  try {
    const tile = await Tile.findByIdAndDelete(tileId);
    return tile;
  } catch (error) {
    throw new Error(`Error deleting tile: ${error}`);
  }
}

const deleteAllTiles = async () => {
  try {
    const tiles = await Tile.deleteMany();
    return tiles;
  } catch (error) {
    throw new Error(`Error deleting all tiles: ${error}`);
  }
}

export default {
  createTile,
  getTiles,
  getTileById,
  getTileByIndexedId,
  findIntersectingTile,
  updateTile,
  deleteTile,
  deleteAllTiles
}