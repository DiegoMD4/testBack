const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const {db} = require("../lib/config")

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());


router.get("/Musica", async(req,res)=>{
    try {
        const snapshot = await db.collection("Musica").get();
        snapshot.forEach((doc) => {
          res.status(200).json(doc.data());
        });
    } catch (error) {
        res.status(404).send("No fue posible conectar con la Base de Datos")
    }
});

module.exports = router;