const express = require("express");
const router = express.Router();
const { getAll, create, remove, edit, getById } = require("../controllers/musica");

router.get("/", getAll);

router.post("/", create);

router.delete("/:id", remove);

router.put("/:id", edit);

router.get("/:id", getById);

module.exports = router;
