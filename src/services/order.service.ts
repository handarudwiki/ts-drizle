import BadRequestError from "../error/bad_request.error";
import NotFoundError from "../error/notfound.error";
import OrderMapping from "../mapping/order";
import OrderRepository from "../repositories/order.repository";
import ProductRepository from "../repositories/product.repository";
import OrderValidation, { CreateOrder } from "../validations/order.validation";
import Validation from "../validations/zod.validation";

export default class OrderService {
    static async create(data:CreateOrder){
        const validData = Validation.validate( OrderValidation.CREATE, data)

        const isProductExist = await ProductRepository.findById(validData.product_id)

        if(!isProductExist.length){
            throw new  NotFoundError(`Product with id ${validData.product_id} not found`)
        }

        const validOrder = OrderMapping.mapOrder(validData, parseInt(isProductExist[0].price))

        const newOrder = await OrderRepository.create(validOrder)

        return newOrder[0]
    }

    static async findAll(){
        return await OrderRepository.findAll()
    }

    static async findById(id: number){
        const isOrderExist = await OrderRepository.findById(id)

        if(!isOrderExist){
            throw new NotFoundError(`Order with id ${id} not found`)
        }

        return isOrderExist
    }

    static async update(id: number, data:CreateOrder){
        const validData = Validation.validate(OrderValidation.UPDATE, data)

        const isOrderExist = await OrderRepository.findById(id)

        if(!isOrderExist){
            throw new NotFoundError(`Order with id ${id} not found`)
        }

        const isProductExist = await ProductRepository.findById(validData.product_id)

        if(!isProductExist.length){
            throw new NotFoundError(`Product with id ${id} not found`)
        }

        const newOrder = OrderMapping.mapOrder(validData, parseInt(isProductExist[0].price))

        const updatedOrder = await OrderRepository.update(id, newOrder)

        return updatedOrder[0]
    }

    static async delete(id: number){
        const isOrderExist = await OrderRepository.findById(id)

        if(!isOrderExist){
            throw new NotFoundError(`Order with id ${id} not found`)
        }

        return await OrderRepository.delete(id)
    }
    static async findByProductId(productId: number) {
        const isProductExist = await ProductRepository.findById(productId);

        if (!isProductExist.length) {
            throw new NotFoundError(`Product with id ${productId} not found`);
        }

        const orders = await OrderRepository.findByProductId(productId);
        return orders;
    }
}