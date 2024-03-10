import User from "../models/user_model";
import { IUser } from "../utils/types";

const createUser = async (email: string, username: string, password: string) => {
  try {
    const user = new User({ email, username, password });
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
};

const getUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(`Error getting users: ${error}`);
  }
}

const getUserById = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error(`Error getting user by userId: ${error}`);
  }
}

const getUserByUsername = async (username: string) => {
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    throw new Error(`Error getting user by username: ${error}`);
  }
}

const updateUser = async (userId: string, userData: IUser) => {
  try {
    const user = await User.findByIdAndUpdate(userId, userData);
    return user
  } catch (error) {
    throw new Error(`Error updating user: ${error}`);
  }
}

const updateUserTileFrequencyMap = async (userId: string, tileIndexedId: number, frequency: number) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User not found`);
    }

    const tileIdStr = tileIndexedId.toString();
    const currFrequency = user.tileFrequency.get(tileIdStr) || 0;
    user.tileFrequency.set(tileIdStr, currFrequency + frequency);

    const updatedUser = await user.save();
    return updatedUser;
  } catch (error) {
    throw new Error(`Error updating user tile frequency map: ${error}`);
  }
}

const deleteUser = async (userId: string) => {
  try {
    const user = await User.findByIdAndDelete(userId);
    return user;
  } catch (error) {
    throw new Error(`Error deleting user: ${error}`);
  }
}

const deleteAllUsers = async () => {
  try {
    const users = await User.deleteMany();
    return users;
  } catch (error) {
    throw new Error(`Error deleting all users: ${error}`);
  }
}


export default {
  createUser,
  getUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  updateUserTileFrequencyMap,
  deleteUser,
  deleteAllUsers
};