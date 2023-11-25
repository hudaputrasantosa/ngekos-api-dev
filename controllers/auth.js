import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).send("Succes create account");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "user not found"));

    const isMatch = await bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) return next(createError(400, "Wrong password!"));

    // Create JWT Payload
    const payload = {
      id: user._id,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, process.env.JWT);

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
