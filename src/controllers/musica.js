const { db } = require("../database/config");
const { Timestamp } = require("firebase-admin/firestore");



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
      const agregar = db.collection("Musica").doc();
  
      await agregar.set({
        artistaBanda: req.body.artistaBanda,
        cancion: req.body.cancion,
        enlace: req.body.enlace,
        fechaPost: Timestamp.now().toDate().toString(),
      });
  
      res.status(200).send("Element created succesfully");
    } catch (error) {
      res.status(500).json({ error: `An error ocurred ${error}` }); 
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

  module.exports = {getAll, create, remove, edit, getById}