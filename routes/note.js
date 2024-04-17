const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const noteCtrl = require("../controller/note");

router.post("/", auth, noteCtrl.create);
router.get("/", auth, noteCtrl.getAll);
router.get("/:id", auth, noteCtrl.getById);
router.patch("/:id", auth, noteCtrl.updateById);
router.delete("/:id", auth, noteCtrl.deleteById);

module.exports = router;
