const express = require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { format } = require('timeago.js');
const cors = require('cors');

const musicController = require('./routes/Musica')


//Initializations
const app = express();

//Middlewares
app.set('json spaces',2);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/img/uploads'),
  filename: (req, file, cb, filename)=>{
      cb(null, uuidv4() + path.extname(file.originalname));
  }
});
app.use(multer({storage:storage}).single('image'));



//App settings
app.set('port',process.env.PORT || 4000);

//Routes
app.use("/Musica", musicController)


//Static Files
app.use(express.static(path.join(__dirname, 'public')));


// Motor de plantilla
app.set("view engine", "ejs");
app.set("views","./src/views");


//Global variables
app.use((req, res, next)=>{
  app.locals.format = format;
  next();
});

app.get("/", (req, res) => {
    res.render("index", { titulo: "inicio EJS" });
  });
  



//Server initialization
app.listen(app.get('port'),(req,res)=>{
    console.log(`Server started at http://localhost:${app.get('port')}`)
});
  