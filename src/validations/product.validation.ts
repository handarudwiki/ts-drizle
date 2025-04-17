import { z } from "zod";

export default class ProductValidation {
    static  CREATE = z.object({
        name: z.string().max(255),
        description: z.string().max(255),
        price: z.number().min(0),
    })

    static UPDATE = z.object({
        name: z.string().max(255),
        description: z.string().max(255),
        price: z.number().min(0),
    })  

}

export type CreateProduct = z.infer<typeof ProductValidation.CREATE>;
export type UpdateProduct = z.infer<typeof ProductValidation.UPDATE>;