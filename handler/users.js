const usersCollection = require('../model/usersModel');
const firebaseAdmin = require('firebase-admin');

const saveUsersHandler = async (req, res) =>{
    try {
        const token = req.headers['authorization'];
        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
    
        const userData = req.body;
    
        await usersCollection.doc(uid).set(userData);
    
        res.status(200).json({ msg: 'Data saved successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error saving data' });
      }
}

module.exports = {
    saveUsersHandler,
}