const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const router = express.Router();

const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        cb(null, "./public/uploads");
    },
    filename:(req,file,cb)=>{
        const ext = file.originalname.split(".").slice(-1)[0];
        cb(null,`${file.originalname}-${Date.now()}.${ext}`);
    }
})

const upload = multer({storage});

router.post('/',upload.single('file'),(req, res) =>{
    let uriFile = `http://${req.hostname}:${req.socket.localPort}/images/${req.file.filename}`
    res.send({
        url: uriFile
    });
});

module.exports = router;