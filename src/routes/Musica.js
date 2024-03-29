const express = require("express");
const router = express.Router();
const { getAll, create, remove, edit, getById} = require("../controllers/MusicaController");

router.get("/", getAll);

router.post("/", create);

router.get("/:id", remove);

router.put("/:id", edit);

router.get("/:id", getById);

module.exports = router;
