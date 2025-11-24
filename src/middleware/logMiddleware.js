import logger from "../utils/logs.js";

const logMiddleware = (req, res, next) => {
    const start = new Date();
    

    res.on('finish', () => {
        const ms = new Date() - start;
        
        logger.info(
            `${req.method} URL: ${req.originalUrl} Status: ${res.statusCode} Duration: ${ms} ms`
        );

    });

    next();
}

export default logMiddleware;

// the method, originalUrl, statusCode, ms req.originalUrl, req.statusCode req.method