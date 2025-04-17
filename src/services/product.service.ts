import NotFoundError from "../error/notfound.error";
import ProductMapping from "../mapping/product";
import ProductRepository from "../repositories/product.repository";
import ProductValidation, { CreateProduct } from "../validations/product.validation";
import Validation from "../validations/zod.validation";

export default class ProductService {
    static async create(data:CreateProduct){
       const validData =  Validation.validate( ProductValidation.CREATE, data)

       const product = ProductMapping.mapProduct(validData)

        const newProduct = await ProductRepository.create(product)
        return newProduct[0]
    }

    static async findAll(){
        return await ProductRepository.findAll()
    }

    static async findById(id: number){
        const isProductExist = await ProductRepository.findById(id)

        if(!isProductExist.length){
            throw new NotFoundError(`Product with id ${id} not found`)
        }

        return isProductExist[0]

    }

    static async update(id: number, data:CreateProduct){
        const validData = Validation.validate(ProductValidation.UPDATE, data)

        const isProductExist = await ProductRepository.findById(id)

        if(!isProductExist.length){
            throw new NotFoundError(`Product with id ${id} not found`)
        }

        const product = ProductMapping.mapProduct(validData)

        const updatedProduct = await ProductRepository.update(id, product)
        return updatedProduct[0]
    }


    static async delete(id: number){
        const isProductExist = await ProductRepository.findById(id)

        if(!isProductExist.length){
            throw new NotFoundError(`Product with id ${id} not found`)
        }

        return await ProductRepository.delete(id)
    }
    
}