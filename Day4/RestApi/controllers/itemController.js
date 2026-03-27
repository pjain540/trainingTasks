const Item = require("../models/Item");

// GET ALL
exports.getAllItems = async (req, res) => {
  const items = await Item.find();
  res.json(items);
};

// GET BY ID
exports.getItemById = async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ msg: "Item not found" });
  res.json(item);
};

// CREATE
exports.createItem = async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.status(201).json(item);
};

// UPDATE
exports.updateItem = async (req, res) => {
  const item = await Item.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(item);
};

// DELETE
exports.deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ msg: "Item deleted" });
};