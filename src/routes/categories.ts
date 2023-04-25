import express from 'express'
import { Request, Response, NextFunction } from 'express'
import CRUDController from '../controllers/crudController'
import Category from '../models/categories'

const categoryRoutes = express.Router()
const CategoryCRUDController = new CRUDController(Category)

categoryRoutes.get('/', (req: Request, res: Response, next: NextFunction) => {
    CategoryCRUDController.getAll(req, res, next)
})

categoryRoutes.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    CategoryCRUDController.getOne(req, res, next)
})

categoryRoutes.post('/', (req: Request, res: Response, next: NextFunction) => {
    CategoryCRUDController.create(req, res, next)
})

categoryRoutes.put('/:id', (req: Request, res: Response, next: NextFunction) => {
    CategoryCRUDController.update(req, res, next)
})

categoryRoutes.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    CategoryCRUDController.delete(req, res, next)
})

export default categoryRoutes