import {  NextFunction, Request, Response } from "express"
import NotFoundError from "../error/notfound.error"
import ConflictError from "../error/conflict.error"
import { ZodError } from "zod"
import BadRequestError from "../error/bad_request.error"

export const  errorMiddleware = (err:Error, req:Request, res:Response, next:NextFunction) => {
    if (err instanceof BadRequestError) {
        return res.status(err.statusCode).json({ message: err.message, details : err.details })
    }
    if (err instanceof NotFoundError) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    if (err instanceof ConflictError) {
        return res.status(err.statusCode).json({ message: err.message })
    }
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
}