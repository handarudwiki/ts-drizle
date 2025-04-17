import { ZodType } from "zod";
import BadRequestError from "../error/bad_request.error";

export default class Validation {
    static validate<T>(schema: ZodType, data: T):T{
        const result = schema.safeParse(data);
        if (!result.success) {
           throw new BadRequestError("Invalid input",result.error.errors.map((error) => {
            return {
                message : error.message,
                path : error.path,
            }
           }));
        }
        return result.data;
    }
}