const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const noteCtrl = require("../controller/note");

const { body } = require("express-validator");
const validate = require("../middleware/validation");

const validationRules = [
  body("title")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Title must be defined")
    .isLength({ min: 3 })
    .withMessage("Min 3 characters")
    .isLength({ max: 50 })
    .withMessage("Max 50 characters"),
  body("content")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Content must be defined")
    .isLength({ min: 3 })
    .withMessage("Min 3 characters"),
  validate,
];

router.post("/", validationRules, auth, noteCtrl.create);
router.get("/", auth, noteCtrl.getAll);
router.get("/:id", auth, noteCtrl.getById);
router.patch("/:id", validationRules, auth, noteCtrl.updateById);
router.delete("/:id", auth, noteCtrl.deleteById);

module.exports = router;
