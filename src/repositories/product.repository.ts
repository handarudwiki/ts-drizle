import { eq } from "drizzle-orm";
import db from "../db/conn";
import { InsertProduct, product, SelectProduct } from "../db/schema";

export default class ProductRepository {
    static async create(newProduct:InsertProduct) {
        return await db.insert(product).values(newProduct).returning({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
        }); 
    }

    static async findAll(){
        return await db.select({
            id : product.id,
            name : product.name,
            description : product.description,
            price : product.price,
        }).from(product);
    }
    static async findById(id: number){
        return await db.select({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
        }).from(product).where(eq(product.id, id)).limit(1);
    }

    static async update(id: number, updatedProduct: InsertProduct) {
        return await db.update(product).set(updatedProduct).where(eq(product.id, id)).returning(
            {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
            }
        ); // Return the updated product
    }
    static async delete(id: number) {
        return await db.delete(product).where(eq(product.id, id)).returning();
    } 
}