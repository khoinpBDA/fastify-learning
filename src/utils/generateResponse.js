const generateResponse = (code, message, data) => {
    return {
      code,
      message,
      data,
    };
  };
  
  generateResponse.success = (data) => {
    return {
      code: 1,
      message: "Success",
      data,
    };
  };
  
  generateResponse.error = (data) => {
    return {
      code: 0,
      message: "error",
      data,
    };
  };
  
  module.exports = generateResponse;
  