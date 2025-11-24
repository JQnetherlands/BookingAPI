const NotFoundErrorHandler = (err, req, res, next) => {
    if (err.name === "NotFoundError") {
        res.status(404).json({ message: err.message });
    } else {
        next(err);
    }
};

export default NotFoundErrorHandler;