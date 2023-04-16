import { Request, Response, NextFunction } from "express";
import { Model } from "sequelize";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import HttpError from "../utils/HttpErrorClass";
import { Role } from "../utils/enums";
import User from "../models/user";

interface UserAttributes{
    id: number,
    email: string,
    name: string,
    password: string,
    role: Role
}

class AuthController {
    private model: typeof User;

    constructor(model: typeof User) {
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
        }
        catch(err){
            console.log('error here is ', err)
            next(err)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try{
            const {email, password} = req.body

            const user = await this.model.findOne({
                where: {
                    email
                }
            }) as unknown as UserAttributes

            if(!user) {
                throw new HttpError(401, 'Email/Password doesn\'t exist')
            } else {
                const passwordMatch = bcrypt.compare(password, user.password)

                if (!passwordMatch) {
                    throw new HttpError(401, 'Email/Password doesn\'t exist')   
                }

                // Generate a JWT token and send it back to the client
                if (process.env.JWT_SECRET) {
                    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);

                    res.status(200).json({
                        status: 'success',
                        message: 'Login Succesful',
                        data: token
                    })
                } else {
                    throw new HttpError(500, 'something went wrong')
                }
            }
        } catch(err) {
            next(err)
        }
    }
}

const authController = new AuthController(User)
export default authController