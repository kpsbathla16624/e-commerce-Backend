import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';
import cors from 'cors';




dotenv.config();

async function start() {
    try {
        const app = express();
        app.use(cors());
        
      
        await mongoose.connect(process.env.MONGO_URL ?? '');

        app.use(express.json({ limit: '1000kb' }));

        
        app.use('/api', router); 
        app.get('/', (req :any, res:any) => {
            return res.send('Hello World!')});

        app.listen(3000,' 192.168.66.244', () => {
            console.log('Server running on port 3000');
        });
       
      
    } catch (error) {
        console.error('Database connection error:', error);
    }
}

start();
