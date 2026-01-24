class ExpressError extends Error {
    constructor(message, statusCode) {
        super(message); // ✅ pass message to Error constructor
        this.statusCode = statusCode;
        this.message = message;
    }
}
module.exports = ExpressError;