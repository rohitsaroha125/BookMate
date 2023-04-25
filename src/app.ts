import express, { NextFunction } from 'express'

import dotenv from 'dotenv';
dotenv.config();

import sequelize from './config/database'
import { errorHandler } from './utils/errorHandler';
import authRoutes from './routes/auth';
import categoryRoutes from './routes/categories';

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('hello world1')
})

// routes handling
app.use('/account', authRoutes)
app.use('/category', categoryRoutes)

app.use(errorHandler)

const port = process.env.PORT || 5000

// Check if there are any errors when initializing Sequelize
if (sequelize) {
    sequelize.authenticate()
  .then(async() => {
    console.log('Database connection successful!');
    // const result = await sequelize.query('SELECT * FROM Users;')
    // console.log(result,'result');
    
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
  });
}

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})