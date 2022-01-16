const fs = require("fs");
const tool = require("hachiware_tool");

module.exports = function(conf, context){

    /**
     * fookRequest
     * @param {*} resolve 
     * @param {*} req 
     * @param {*} res 
     */
    this.fookRequest = function(resolve, req, res){

		try{

			res.setHeader("server","hachiware server");

			if(conf.headers){
				var colums = Object.keys(conf.headers);
				for(var n = 0 ; n < colums.length ; n++){
					var field = colums[n];
					var value = conf.headers[field];
					res.setHeader(field, value);
				}
			}
	
            context.loadFookModule("access",[
                req, 
                res,
            ]);

			if(tool.objExists(conf,"callbacks.access")){
				conf.callbacks.access(req, res);
				return;
			}

		}catch(error){

//			errors.bind(context)(error, conf, req, res);

            if(res.statusCode == 200){
                res.statusCode = 500;
            }
        
            context.loadFookModule("error",[
                error, 
                req, 
                res,
            ]);
        
            if(tool.objExists(conf,"callbacks.error")){
        
                conf.callbacks.error(error, req, res);
                
                if(conf.errorConsoleOutput){
                    console.log(tool.getDateFormat("[{DATETIME}] ") + error);
                }

            }
            else{
                res.end();
            }
        
            if(conf.errorConsoleOutput){
                console.log(tool.getDateFormat("[{DATETIME}] ") + error);
            }

		}

    };

};