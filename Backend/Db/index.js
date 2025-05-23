import mongoose from 'mongoose';

export async function connectDB() {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URL, {
      maxPoolSize: 10,
    });

    if (connection.readyState === 1) {
      console.log('Connected to MongoDB successfully');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}
