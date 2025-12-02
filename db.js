import mongoose from 'mongoose';
import process from 'process';

const mongoURI = 'mongodb://localhost:27017/notebook'; // Update with your MongoDB URI

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectToMongo;