/**
 * ============================================================================================
 * Hachiware_Server_module_callback
 * 
 * Module for callback when request is received of Web server package "hachiware_server".
 * 
 * Author : Nakatsuji Masato 
 * ============================================================================================
 */

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