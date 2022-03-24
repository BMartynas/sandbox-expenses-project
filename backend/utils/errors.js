export const handleError = (res, error, statusCode) => {
  res.status(statusCode).json({ message: error.message });
};
