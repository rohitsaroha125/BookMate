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

interface AuthAttributes extends Request{
    user?: UserAttributes
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

    async protect(req: AuthAttributes, res: Response, next: NextFunction) {
        try{
            let token
            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1]
            }

            if (!token) {
                throw new HttpError(401, 'Authorization not present')
            }

            if (process.env.JWT_SECRET) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: number, email: string }

                const user = await this.model.findOne({
                    where: {
                        id: decoded.id
                    }
                })

                if (!user) {
                    throw new HttpError(404, 'No Such User found')
                }

                req.user = user as unknown as UserAttributes

                next()
            } else {
                throw new HttpError(500, 'Authorization not done')
            }
        } catch(err) {
            next(err)
        }
    }

    restrictTo = async (...roles: Role[]) => {
        return (req: AuthAttributes, res: Response, next: NextFunction) => {
            try {
                const { user } = req

                if (!user) {
                    throw new HttpError(401, 'You are not authorized to perform this action')
                }

                if (!roles.includes(user.role)) {
                    throw new HttpError(403, 'You do not have permission to perform this action')
                }

                next()
            } catch(err) {
                next(err)
            }
        }
    }
}

const authController = new AuthController(User)
export default authController