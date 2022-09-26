const express = require('express');
const app = express();
/* const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

initializeApp();

const db = getFirestore();
 */

app.set('port',process.env.PORT || 4000);

const server = app.listen(app.get('port'),(req,res)=>{
    console.log(`Server started at http://localhost:${app.get('port')}`)
  })
  