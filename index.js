const express = require('express');
const app = express();
const cors = require('cors')


app.use('/images',express.static(__dirname +'./public/uploads'));
app.set('json spaces',2);
app.use(express.json());
app.use(cors());

app.set('port',process.env.PORT || 4000);

app.use("/", require('./src/routes/Musica'))
app.use("/", require('./src/routes/imagenes'))



app.listen(app.get('port'),(req,res)=>{
    console.log(`Server started at http://localhost:${app.get('port')}`)
});
  