export default class ConflictError extends Error {
    statusCode = 409;
    constructor(message: string) {
        super(message);
    }
}