import firestore from '../utils/db.js';

const usersCollection = firestore.collection('users');

export default usersCollection;