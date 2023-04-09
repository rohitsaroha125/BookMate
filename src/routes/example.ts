import express from "express";
import { Request, Response, NextFunction } from "express";

const router = express.Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('This is our home page')
})

export default router