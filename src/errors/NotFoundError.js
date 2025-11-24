
class NotFoundError extends Error {
    constructor(type, id) {
        console.log(id);
        super(`the ${type} with ${id} was not found`);
        this.name = 'NotFoundError';
    }
}

export default NotFoundError;