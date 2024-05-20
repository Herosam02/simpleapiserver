const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = "mongodb+srv://test:test@atlascluster.cgzuyoa.mongodb.net/test?retryWrites=true&w=majority&appName=AtlasCluster";
        await mongoose.connect(uri, {  });
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err.message);
    }
};

module.exports = connectDB;