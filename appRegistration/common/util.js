const User = require('../schema/user')
const Company = require('../schema/company')

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

const checkIfCompanyExists = async (companyId) => {
  try{
    const companyInDb = await Company.findOne({companyId : companyId});
    if(companyInDb) return true;
    else return false;
  }catch(e){
    console.log(`utils :: checkIfCompanyExists : Error = ${e}`)
  }
}

const checkIfUserExists = async (publicKey, companyId) => {
  try{
    const userinDb = await User.findOne({publicKey : publicKey, companyId : companyId});
    if(userinDb) return true;
    else return false;
  }catch(e){
    console.log(`utils :: checkIfUserExists : Error = ${e}`)
  }
}

module.exports = {
  formattedResponse,
  checkIfCompanyExists,
  checkIfUserExists
}