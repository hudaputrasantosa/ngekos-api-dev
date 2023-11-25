import Kos from "../models/Kos.js";

export const createKos = async (req, res) => {
  const newKos = new Kos(req.body);
  try {
    const savedKos = await newKos.save();
    res.status(200).json(savedKos);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateKos = async (req, res) => {
  try {
    const updatedKos = await Kos.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedKos);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteKos = async (req, res) => {
  try {
    await Kos.findByIdAndDelete(req.params.id);
    res.status(200).send({
      message: `Successfully deleted the kos with id ${req.params.id}`,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getKos = async (req, res) => {
  try {
    const getKosById = await Kos.findById(req.params.id);
    res.status(200).send(getKosById);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllKos = async (req, res) => {
  const { min, max, limit, ...other } = req.query;
  try {
    const getKoses = await Kos.find({
      ...other,
      price: { $gt: min - 1 || 1, $lt: max + 1 || 100000000 },
    }).limit(limit);

    res.status(200).send(getKoses);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const countByCity = async (req, res) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Kos.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
};

export const countByType = async (req, res) => {
  try {
    const countPutra = await Kos.countDocuments({ type: "putra" });
    const countPutri = await Kos.countDocuments({ type: "putri" });
    const countCampuran = await Kos.countDocuments({ type: "campuran" });
    const listType = [
      { type: "putra", count: countPutra },
      { type: "putri", count: countPutri },
      { type: "campuran", count: countCampuran },
    ];
    res.status(200).json(listType);
  } catch (error) {
    next(error);
  }
};
