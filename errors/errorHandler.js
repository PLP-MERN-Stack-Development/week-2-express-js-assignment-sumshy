const errorHandler = (err, req, res, next) => {
  console.error(`${err.name}: ${err.message}`);
  
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: err.name,
    message: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
