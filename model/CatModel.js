import mongoose from 'mongoose';

mongoose.connect('env.config', {
    useNewUrlParser: true,
    useUnifiedTopology: true,   
});

const catSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    size: String,
    coat: String,
    breed: String,
    description: String,
    image: String,
    url: String,
});

const Cat = mongoose.model('ShelterCat', catSchema);

export default Cat;
