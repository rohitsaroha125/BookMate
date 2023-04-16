import express from 'express'
import { Request, Response, NextFunction } from 'express'
import User from '../models/user'
import authController from '../controllers/authControllers'

const authRoutes=express.Router()

authRoutes.post('/register', (req: Request, res: Response, next: NextFunction) => {
    authController.register(req, res, next)
})
authRoutes.post('/login', (req:Request, res: Response, next: NextFunction) => {
    authController.login(req, res, next)
})

export default authRoutes