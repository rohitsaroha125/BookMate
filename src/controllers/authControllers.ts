import { Request, Response, NextFunction } from "express";
import { Model } from "sequelize";

import User from "../models/user";

class AuthController {
    private model: typeof Model;

    constructor(model: typeof Model) {
        this.model=model
    }

    async register(req: Request, res: Response, next: NextFunction){
        try{
            const {
                email,
                name,
                password,
                role
            } = req.body
    
            const user = await this.model.create({
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
    }
}

const authController = new AuthController(User)
export default authController