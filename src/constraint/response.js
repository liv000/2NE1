const errorResponse = (status, code, message) => {
  return {
    status: status,
    errorObj: {
      errorCode: code,
      errorMessage: message,
    },
  };
};

export { errorResponse };
