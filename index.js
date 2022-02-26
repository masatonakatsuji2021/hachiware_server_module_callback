/**
 * ============================================================================================
 * Hachiware_Server_module_basic_auth
 * 
 * Module for callback when request is received of Web server package "hachiware_server".
 * 
 * License : MIT License. 
 * Since   : 2022.01.15
 * Author  : Nakatsuji Masato 
 * Email   : nakatsuji@teastalk.jp
 * HP URL  : https://hachiware-js.com/
 * GitHub  : https://github.com/masatonakatsuji2021/Hachiware_Server_module_basic_auth
 * npm     : https://www.npmjs.com/package/Hachiware_Server_module_basic_auth 
 * ============================================================================================
 */

const fs = require("fs");
const tool = require("hachiware_tool");

module.exports = function(conf, context){

    /**
     * module
     * @param {*} moduleName 
     * @returns 
     */
    this.module = function(moduleName){

        var mList = context.modules[conf._file];

        if(!(
            mList[moduleName] ||
            mList["hachiware_server_module_" + moduleName]
        )){
            return;
        }

        var getModule;

        if(mList[moduleName]){
            getModule = mList[moduleName];
        }


        if(mList["hachiware_server_module_" + moduleName]){
            getModule = mList["hachiware_server_module_" + moduleName];
        }

        return getModule;
    };

    /**
     * getConf
     * @returns 
     */
    this.getConf = function(){
        return conf;
    }

    /**
     * fookRequest
     * @param {*} resolve 
     * @param {*} req 
     * @param {*} res 
     */
    this.fookRequest = function(resolve, req, res){

		try{
	
            context.loadFookModule(conf, "access",[
                req, 
                res,
            ]);

			if(tool.objExists(conf,"callbacks.access")){
				conf.callbacks.access.bind(this)(req, res);
				return;
			}

		}catch(error){

//			errors.bind(context)(error, conf, req, res);

            if(res.statusCode == 200){
                res.statusCode = 500;
            }
        
            context.loadFookModule(conf, "error",[
                error, 
                req, 
                res,
            ]);
        
            if(tool.objExists(conf,"callbacks.error")){
                conf.callbacks.error.bind(this)(error, req, res);
            }
            else{
                res.end();
            }
		}

    };

};