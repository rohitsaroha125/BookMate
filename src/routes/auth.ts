import express from 'express'
import { Request, Response, NextFunction } from 'express'

const authRoutes=express.Router()

authRoutes.post('/register', (req: Request, res: Response, next: NextFunction) => {

})

export default authRoutes