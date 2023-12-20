import firestore from '../utils/db.js';

const userInterestCollection = firestore.collection('userInterests');

export default userInterestCollection;
