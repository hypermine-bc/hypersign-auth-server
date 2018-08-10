var datetime = require('node-datetime');

class  responseHandeller{

	constructor(data)
    {
        this.dt = datetime.create();
		this.formatted = dt.format('m/d/Y H:M:S');
    }

	buildSuccessfulResponse($data, $display_message){
		
		var res = {
		  "message": $display_message,
		  "data": $data,
		  "name": "sucess",
		  "status": "sucess",
		  "code": 200	,
		  "errors": {},
		  "stack": "Sucess\n ...",
		  "time": this.formatted // Response time
		}

		return res
	}

	buildUnsuccessfulResponse($data,$error_type, $error_details, $display_message, $http_code){
		var res = {
		  "message": $display_message,
		  "data": $data,
		  "name": "Unauthorized",
		  "status": "sucess",
		  "code":  $http_code	,
		  "errors": {'type': $error_type, 'details': $error_details},
		  "stack": "Error\n ...",
		  "time": this.formatted // Response time
		}

		return res
	}
} 

module.exports.responseHandeller = responseHandeller