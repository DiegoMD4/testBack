const express = require('express');
const app = express();
const cors = require('cors')
const musicaController = require('./src/routes/musica')
const imagesController = require('./src/routes/imagenes')

app.use('/images',express.static('./public/uploads'));
app.set('json spaces',2);
app.use(express.json());
app.use(cors());

app.set('port',process.env.PORT || 4000);

app.use("/Musica", musicaController)
app.use("/Upload", imagesController)



app.listen(app.get('port'),(req,res)=>{
    console.log(`Server started at http://localhost:${app.get('port')}`)
});
  