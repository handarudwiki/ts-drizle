import { InsertOrder } from "../db/schema";
import { CreateOrder } from "../validations/order.validation";

export default class OrderMapping {
    static mapOrder(order: CreateOrder, price:number): InsertOrder {
        return {
            productId: order.product_id,
            quantity: order.quantity,
            total_price: String(price * order.quantity),
        };
    }
}