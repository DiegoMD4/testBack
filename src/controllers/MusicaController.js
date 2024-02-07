const { db } = require("../database/config");
const { Timestamp } = require("firebase-admin/firestore");
const {unlink} = require('fs-extra');
const path = require('path');
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

});

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
      const result = await cloudinary.uploader.upload(req.file.path);
      let uriFile = `http://${req.hostname}:${req.socket.localPort}/img/uploads/${req.file.filename}`
      const agregar = db.collection("Musica").doc();
      await agregar.set({
        artistaBanda: req.body.artistaBanda,
        cancion: req.body.cancion,
        enlace: req.body.enlace,
        imagen: uriFile,
        fechaPost: Timestamp.now().toDate().toString(),
        image_url: result.url,
        public_id: result.public_id
      });
      await unlink(path.resolve(`./src/public/img/uploads/${req.file.filename}`));
      res.status(200).json(agregar.data);
    } catch (error) {
      res.status(500).json({ error: `An error ocurred ${error}` }); 
      
    }
  }

const remove =  async (req, res) => {
    try {
      const result = await db.collection("Musica").doc(req.params.id).get();
      await db.collection("Musica").doc(req.params.id).delete();
      await cloudinary.uploader.destroy(result.data().public_id);
      
      
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

  module.exports = {getAll, create, remove, edit, getById}