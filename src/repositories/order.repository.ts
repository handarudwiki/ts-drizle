import { eq, or } from "drizzle-orm";
import db from "../db/conn";
import { InsertOrder, order } from "../db/schema";

export default class OrderRepository {
    static  async create(newOrder:InsertOrder){
        return await db.insert(order).values(newOrder).returning({
            id: order.id,
            productId: order.productId,
            quantity: order.quantity,
            totalPrice: order.total_price,
        });
    }


    static async findAll(){
        return await db.query.order.findMany({
            columns:{
                id : true,
                productId :true,
                quantity : true,
                total_price : true,
            },
            with: {
                product: {
                    columns: {
                        id: true,
                        name: true,
                        description: true,
                        price: true,
                    }
                }
            }
        })
    }

    static async findById(id: number){
        return await db.query.order.findFirst({
            where: eq(order.id, id),
            columns: {
                id: true,
                productId: true,
                quantity: true,
                total_price: true,
            },
            with: {
                product: {
                    columns: {
                        id: true,
                        name: true,
                        description: true,
                        price: true,
                    }
                }
            }
        })
    }

    static async update(id: number, updatedOrder: InsertOrder) {
        return await db.update(order).set(updatedOrder).where(eq(order.id, id)).returning({
            id: order.id,
            productId: order.productId,
            quantity: order.quantity,
            totalPrice: order.total_price,
        }); // Return the updated order
    }

    static async delete(id: number) {
        return await db.delete(order).where(eq(order.id, id)).returning();
    }

    static async findByProductId(productId: number) {
        return await db.query.order.findMany({
            where: eq(order.productId, productId),
            columns: {
                id: true,
                productId: true,
                quantity: true,
                total_price: true,
            },
            with: {
                product: {
                    columns: {
                        id: true,
                        name: true,
                        description: true,
                        price: true,
                    }
                }
            }
        })
    }

}