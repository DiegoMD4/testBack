const express = require('express');
const app = express();
const cors = require('cors')
const musicController = require('./src/routes/musica')
const imagesController = require('./src/routes/imagenes')
const bodyParser = require("body-parser");

//Middlewares
app.use('/images',express.static('./public/uploads'));
app.use('/resource',express.static('./public/optimize'));
app.set('json spaces',2);
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//App settings
app.set('port',process.env.PORT || 4000);

//Routes
app.use("/Musica", musicController)
app.use("/Upload", imagesController)

// Motor de plantilla
app.set("view engine", "ejs");
app.set("views","./src/views");

app.get("/", (req, res) => {
    res.render("index", { titulo: "inicio EJS" });
  });
  



//Server initialization
app.listen(app.get('port'),(req,res)=>{
    console.log(`Server started at http://localhost:${app.get('port')}`)
});
  