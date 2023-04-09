import express from 'express'
import { Request, Response, NextFunction } from 'express'
import User from '../models/user'

const authRoutes=express.Router()

authRoutes.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {
            email,
            name,
            password,
            role
        } = req.body

        const user = await User.create({
            email,
            name,
            password,
            role
        })

        res.status(200).json({
            status: "success",
            message: "Registration Successful!",
            data: user.toJSON()
        })
    }catch(err){
        next(err)
    }
})

export default authRoutes