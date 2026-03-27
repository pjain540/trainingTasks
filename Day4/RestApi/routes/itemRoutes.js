const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

router.get("/", auth, getAllItems);
router.get("/:id", auth, getItemById);
router.post("/", auth, validate, createItem);
router.put("/:id", auth, validate, updateItem);
router.delete("/:id", auth, deleteItem);

module.exports = router;