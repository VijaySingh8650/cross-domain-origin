import mongoose from 'mongoose';

type connectDBType = () => Promise<void>;
export const connectDB:connectDBType  = () =>{
    const connectionString = process.env.CONNECT_MONGODB ?? 'defaultConnectionUri';


    return mongoose.connect(connectionString)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
      });
}
