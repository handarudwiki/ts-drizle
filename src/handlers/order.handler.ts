import { NextFunction, Request, Response } from "express"
import OrderService from "../services/order.service"

export default class OrderHandler{
    static async create(req:Request, res:Response, next:NextFunction){
        try {
            const order = await OrderService.create(req.body)
            return res.status(201).json(order)
        } catch (error) {
            next(error)  
        }
    }

    static async findAll(req:Request, res:Response, next:NextFunction){
        try {
            const orders = await OrderService.findAll()
            return res.status(200).json(orders)
        } catch (error) {
            next(error)
        }
    }

    static async findById(req:Request, res:Response, next:NextFunction){
        try {
            const order = await OrderService.findById(Number(req.params.id))
            return res.status(200).json(order)
        } catch (error) {
            next(error)
        }
    }

    static async update(req:Request, res:Response, next:NextFunction){
        try {
            const order = await OrderService.update(Number(req.params.id), req.body)
            return res.status(200).json(order)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req:Request, res:Response, next:NextFunction){
        try {
            const order = await OrderService.delete(Number(req.params.id))
            return res.status(204).json(order)
        } catch (error) {
            next(error)
        }
    }

    static async findByProduct(req:Request, res:Response, next:NextFunction){
        try {
            const order = await OrderService.findByProductId(Number(req.params.userId))
            return res.status(200).json(order)
        } catch (error) {
            next(error)
        }
    }
}