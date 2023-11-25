import User from "../models/User.js";

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await Kos.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await Kos.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: `Successfully deleted the kos with id ${req.params.id}`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await Kos.findById(req.params.id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await Kos.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
