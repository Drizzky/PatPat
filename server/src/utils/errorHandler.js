export default function errorHandler(err, req, res) {
  console.error(err);
  res.status(err.httpStatus || 500).send({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
}

