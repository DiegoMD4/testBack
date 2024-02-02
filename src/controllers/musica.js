const { db } = require("../database/config");
const { Timestamp } = require("firebase-admin/firestore");
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb)=>{
    const ext = file.originalname.split(".").slice(-1)[0];
    const parsedFileName = path.parse(file.originalname).name;
    cb(null, `${file.fieldname}-${parsedFileName}-${Date.now()}.${ext}`);
  }
})

//sharp

const helperImg = (filePath, filename, size = 200)=>{
  return sharp(filePath).resize(size).toFile(`./public/optimize/${filename}`)
}

const upload = multer({storage});

const getAll = async (req, res) => {
    try {
      const result = db.collection("Musica").get();
  
      const music = (await result).docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(music);
    } catch (error) {
      res.status(500).json({ error: `An error ocurred ${error}` });
    }
  }

const create = async (req, res) => {
    try {
      let uriFile = `http://${req.hostname}:${req.socket.localPort}/images/${req.file.filename}`
      let resizePic = `http://${req.hostname}:${req.socket.localPort}/resource/resize-${req.file.filename}`
      helperImg(req.file.path, `resize-${req.file.filename}`, 200)
      const agregar = db.collection("Musica").doc();
      await agregar.set({
        artistaBanda: req.body.artistaBanda,
        cancion: req.body.cancion,
        enlace: req.body.enlace,
        imagen: resizePic,
        fechaPost: Timestamp.now().toDate().toString(),
      });
      res.status(200).send({ url: uriFile, message: "Element created succesfully"});
      console.log(req.body, resizePic)
    } catch (error) {
      res.status(500).json({ error: `An error ocurred ${error}` }); 
      console.log(req.body )
    }
  }

const remove =  async (req, res) => {
    try {
  
      await db.collection('Musica').doc(req.params.id).delete();
      res.status(200).send("Deleted succesfully");
  
    } catch (error) {
      res.status(500).json({ error: `An error ocurred ${error}` });
    }
  }

const edit =  async (req, res)=>{
    try {
      await db.collection("Musica").doc(req.params.id).update(req.body);
      res.status(200).send("Updated correctly");
    } catch (error) {
      res.status(500).json({ error: `A server error ocurred ${error}` });
    }
  }

const getById = async (req, res) => {
    try {
      const result = await db.collection("Musica").doc(req.params.id).get();
      res.status(200).json({
        id: result.id,
        ...result.data()
      });
    } catch (error) {
      res.status(500).json({ error: `An error ocurred ${error}` });
    }
  }

  module.exports = {getAll, create, remove, edit, getById, upload}