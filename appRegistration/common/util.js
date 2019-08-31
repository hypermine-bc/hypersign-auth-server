

const STATUS = {
  SUCCESS : 1, 
  FAIL : 0
};

const response = {
  "status" : "",
  "data" : ""
}

const formattedResponse = (status, message) => {
  response.status = status == STATUS.SUCCESS ? "SUCESS" : "FAIL",
  response.data = message
  return response;
}

module.exports = {
  formattedResponse
}