import Tile from "../models/tile_model";
import { ITile } from "../utils/types";



const createTile = async (tileData: ITile) => {
  try {
    const tile = new Tile(tileData);
    await tile.save();
    return tile;
  } catch (error) {
    throw new Error(`Error creating tile: ${error}`);
  }
};

export default {
  createTile
}