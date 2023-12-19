import mongoose from 'mongoose';

mongoose.connect('env.config', {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
});

const userInterestSchema = new mongoose.Schema({
    cat_Breeds: String,
    cat_Activity: String,
    cat_Color: String,
    cat_Fur: String,
    cat_FurTexture: String,
    cat_UndercoatPattern: String,
});

const UserInterest = mongoose.model('UserInterest', userInterestSchema);

export default UserInterest;
