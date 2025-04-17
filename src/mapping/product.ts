import { InsertProduct } from "../db/schema";
import { CreateProduct } from "../validations/product.validation";

export default class ProductMapping {
    static mapProduct(product:CreateProduct) :InsertProduct{
        return {
            name: product.name,
            description: product.description,
            price: String(product.price),
        };
    }
}