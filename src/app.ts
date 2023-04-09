import express from 'express'
import sequelize from './config/database'
import dotenv from 'dotenv';
import { errorHandler } from './utils/errorHandler';
dotenv.config();

const app = express()

app.use(errorHandler)

const port = process.env.PORT || 5000

// Check if there are any errors when initializing Sequelize
sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
  });

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})