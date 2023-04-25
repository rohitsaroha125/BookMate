import { Request, Response, NextFunction } from "express";
import { Model } from "sequelize";
import HttpError from "../utils/HttpErrorClass";

class CRUDController<T extends Model>{
    private model: any;

    constructor(model: any) {
        this.model=model
    }

    async getAll(req: Request, res: Response, next: NextFunction){
        try{
            const {
                page=1,
                limit=10,
                orderBy='id',
                orderDir='asc'
            } = req.query

            const offset = (Number(page) - 1) * Number(limit)
            const order = [[orderBy, orderDir]]

            const records = await this.model.findAndCountAll({
                limit: Number(limit),
                offset,
                order
            })

            const totalPages = Math.ceil(records.count / Number(limit))

            res.status(200).json({
                status: "success",
                message: `Fetched All ${this.model.tableName}`,
                data: {
                    items: records,
                    pagination: {
                        totalPages,
                        currentPage: Number(page),
                        totalIyems: records.count
                    }
                }
            })
        } catch(err) {
            next(err)
        }
    }

    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const record = await this.model.findByPk(req.params.id)
            res.status(200).json({
                status: "success",
                message: `Fetched record`,
                data: record
            })
        } catch(err) {
            next(err)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const record = await this.model.create(req.body)
            res.status(200).json({
                status: "success",
                message: "Successfully created",
                data: record
            })
        } catch(err) {
            next(err)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const record = await this.model.findByPk(req.params.id)
            if (record) {
                await record.update(req.body)
                res.status(200).json({
                    status: "success",
                    message: "Successfully updated",
                    data: record
                })
            } else {
                throw new HttpError(404, 'Record not found')
            }
        } catch(err) {
            next(err)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const record = await this.model.findByPk(req.params.id)
            if (record) {
                await record.destroy()
                res.status(200).json({
                    status: "success",
                    message: "Successfully deleted",
                    data: record
                })
            } else {
                throw new HttpError(404, 'Record not found')
            }
        } catch(err) {
            next(err)
        }
    }
}

export default CRUDController