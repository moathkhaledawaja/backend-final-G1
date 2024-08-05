import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db';
import productRoutes from './routes/productRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', productRoutes);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected!');
        await sequelize.sync({ force: false });
        console.log('Database synchronized!');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
