import { RequestHandler } from "express";
import { userServices } from "../services";

// No need for createUser in controllers, because that's handled by auth register

const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await userServices.getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const getUserById: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userServices.getUserById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const getUserByUsername: RequestHandler = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await userServices.getUserByUsername(username);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const updateUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = req.body;
    const updatedUser = await userServices.updateUser(userId, userData);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await userServices.deleteUser(userId);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const deleteAllUsers: RequestHandler = async (req, res) => {
  try {
    const deletedUsers = await userServices.deleteAllUsers();
    res.status(200).json(deletedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error', error });
  }
}

const userController = {
  getUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
  deleteAllUsers
}

export default userController;