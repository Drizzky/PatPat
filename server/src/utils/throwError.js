const throwError = (msg, code) => {
  const err = new Error(msg);
  err.httpStatus = code;
  throw err;
};

export default throwError;
