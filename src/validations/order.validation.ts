import { z } from "zod";

export default class OrderValidation{
    static CREATE = z.object({
        product_id: z.number().min(1),
        quantity: z.number().min(1),
    })

    static UPDATE = z.object({
        product_id: z.number().min(1),
        quantity: z.number().min(1),
    })
}

export type CreateOrder = z.infer<typeof OrderValidation.CREATE>;
export type UpdateOrder = z.infer<typeof OrderValidation.UPDATE>;
