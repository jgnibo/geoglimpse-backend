import { RequestHandler } from "express";
import bcrypt from 'bcrypt';
import User from '../models/user_model';
import user_services from '../services/user_services';
import authentication from '../utils/jwt';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
}

const verifyUser: RequestHandler = async (req, res) => {
  if (!req.cookies) {
    return res.json({ status: false });
  }

  const { token } = req.cookies;

  if (!token) {
    return res.json({ status: false });
  }
  const decoded = jwt.verify(token as string, process.env.TOKEN_KEY as string) as TokenPayload;
  const user = await User.findById(decoded.id);
  if (user) {
    // get random tile index
    const tileIndex = Math.floor(Math.random() * 1000);
    const frequency = Math.floor(Math.random() * 10);
    user.tileFrequency.set(tileIndex.toString(), frequency);
    console.log(user.tileFrequency)
    await user.save();
    return res.json({ status: true, user });
  }
  return res.json({ status: false });
};

const register: RequestHandler = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await user_services.createUser(email, username, hashedPassword);
    const token = authentication.createSecretToken(user._id as string);

    res.cookie('token', token, {
      // withCredentials: true,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return res
      .status(201)
      .json({ message: 'Account created successfully', success: true, user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', success: false });
  }
};

const login: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!password || !username) {
      return res.json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: 'No user found with this username' });
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) {
      return res.json({ message: 'Incorrect password' });
    }

    const token = authentication.createSecretToken(user._id as string);

    res.cookie('token', token, {
      // withCredentials: true,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return res.status(201).json({ message: 'User logged in successfully', success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', success: false });
  }
};

const logout: RequestHandler = (req, res) => {
  try {
    res.cookie('token', '', {
      // withCredentials: true,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return res.status(200).json({ message: 'User logged out successfully', success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong', success: false });
  }
};

export default {
  register,
  login,
  logout,
  verifyUser,
};
