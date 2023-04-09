import express from 'express'

import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/database'
import { errorHandler } from './utils/errorHandler';
import authRoutes from './routes/auth';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// routes handling
app.use('/account', authRoutes)

app.use(errorHandler)

const port = process.env.PORT || 5000

// Check if there are any errors when initializing Sequelize
if (sequelize) {
    sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
  });
}

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})