import User from "../models/user_model";
// import { IUser } from "../utils/types";

const createUser = async (email: string, username: string, password: string) => {
  try {
    const user = new User({ email, username, password });
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
};

export default {
  createUser,
};