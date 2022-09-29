const express = require('express');
const app = express();


app.set('port',process.env.PORT || 4000);

app.use("/", require('./src/routes/Musica'))

app.listen(app.get('port'),(req,res)=>{
    console.log(`Server started at http://localhost:${app.get('port')}`)
});
  