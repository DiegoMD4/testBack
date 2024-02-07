const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

initializeApp({
    credential: applicationDefault(),
    databaseURL: "https://<testDataBase>.firebaseio.com",
    
});

const db = getFirestore();

module.exports = {db}