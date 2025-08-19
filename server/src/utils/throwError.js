const throwError = (msg = '', code = 404) => {
  const err = new Error(msg);
  err.httpStatus = code;
  throw err;
};

export default throwError;
