import { Firestore } from '@google-cloud/firestore';

const firestore = new Firestore({
    projectId: '...',  //Fill Project Id from Firestore
    keyFilename: "..."  //Fill path/to/the/serviceAccountKey.json
});

var admin = require("firebase-admin");

var serviceAccount = require("...");  //Fill path/to/the/serviceAccountKey.json

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export default firestore;
