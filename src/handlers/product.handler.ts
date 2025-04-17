import { NextFunction, Request, Response } from 'express'
import ProductService from '../services/product.service'


export default class ProductHandler{
    static async create(req:Request, res:Response, next:NextFunction){
        try {
            const product = await ProductService.create(req.body)

            return res.status(201).json(product)
        } catch (error) {
            next(error)  
        }
    }

    static async findAll(req:Request, res:Response, next:NextFunction){
        try {
            const products = await ProductService.findAll()
            return res.status(200).json(products)
        } catch (error) {
            next(error)
        }
    }

    static async findById(req:Request, res:Response, next:NextFunction){
        try {
            const product = await ProductService.findById(Number(req.params.id))
            return res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    }
    static async update(req:Request, res:Response, next:NextFunction){
        try {
            const product = await ProductService.update(Number(req.params.id), req.body)
            return res.status(200).json(product)
        } catch (error) {
            next(error)
        }
    }
    static async delete(req:Request, res:Response, next:NextFunction){
        try {
            const product = await ProductService.delete(Number(req.params.id))
            return res.status(204).json(product)
        } catch (error) {
            next(error)
        }
    }
}