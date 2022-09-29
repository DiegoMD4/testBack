const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { db } = require("../lib/config");
const { Timestamp } = require("firebase-admin/firestore");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/Musica", async (req, res) => {
  try {
    const result = db.collection("Musica").get();

    const music = (await result).docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(music);
  } catch (error) {
    res.status(400).json({ error: `An error ocurred ${error}` });
  }
});

router.post("/Musica", async (req, res) => {
  try {
    const agregar = db.collection("Musica").doc();

    await agregar.set({
      Artista_Banda: req.body.Artista_Banda,
      Cancion: req.body.Cancion,
      Enlace: req.body.Enlace,
      Fecha_Salida: Timestamp.now().toDate().toString(),
    });

    res.status(200).send("Creado correctamente");
  } catch (error) {
    res.status(400).json({ error: `An error ocurred ${error}` }); 
  }
});

router.delete("/Musica/:id", async (req, res) => {
  try {

    await db.collection('Musica').doc(req.params.id).delete();
    res.status(200).send("Elemento eliminado");

  } catch (error) {
    res.status(400).json({ error: `An error ocurred ${error}` });
  }
});

router.put("/Musica/:id", async (req, res)=>{
  try {
    await db.collection("Musica").doc(req.params.id).update(req.body);
    res.status(200).send("Actualizado correctamente");
  } catch (error) {
    res.status(400).json({ error: `An error ocurred ${error}` });
  }
});

router.get("/Musica/:id", async (req, res) => {
  try {
    const result = await db.collection("Musica").doc(req.params.id).get();
    res.status(200).json({
      id: result.id,
      ...result.data()
    });
  } catch (error) {
    res.status(400).json({ error: `An error ocurred ${error}` });
  }
});

module.exports = router;
