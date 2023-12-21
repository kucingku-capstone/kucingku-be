import { Firestore } from '@google-cloud/firestore';

const firestore = new Firestore({
    projectId: 'capstone-kucingku',  //Fill Project Id from Firestore
    keyFilename: "nothing.json"  //Fill path/to/the/serviceAccountKey.json
});

var admin = require("firebase-admin");

var serviceAccount = require("nothing.json");  //Fill path/to/the/serviceAccountKey.json

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default firestore;
