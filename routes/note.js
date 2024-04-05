const express = require("express");
const router = express.Router();

const noteCtrl = require("../controller/note");

router.post("/", noteCtrl.create);
router.get("/", noteCtrl.getAll);
router.get("/:id", noteCtrl.getById);
router.patch("/:id", noteCtrl.updateById);
router.delete("/:id", noteCtrl.deleteById);

module.exports = router;
