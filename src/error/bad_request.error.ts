export default class BadRequestError extends Error {
    statusCode = 400;
    details = {}
    constructor(message: string, details:object) {
        console.log(details)
        super(message);
        this.details = details;
    }
    
}