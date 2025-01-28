const errorHandler = (err, req, res, next) => {
    console.error("❌ Error: ", err);

    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message || "Error interno del servidor";

    res.status(statusCode).json({
        error: message,
    });
};

export default errorHandler;