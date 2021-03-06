# hachiware_server_module_callback

<a href="https://github.com/masatonakatsuji2021/hachiware_server_module_callback/blob/master/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/masatonakatsuji2021/hachiware_server_module_callback"></a>
<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/masatonakatsuji2021/hachiware_server_module_callback">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/masatonakatsuji2021/hachiware_server_module_callback">
<img alt="Libraries.io dependency status for GitHub repo" src="https://img.shields.io/librariesio/github/masatonakatsuji2021/hachiware_server_module_callback">
<img src="https://img.shields.io/badge/author-Nakatsuji%20Masato-brightgreen" alt="author Nakatsuji Masato">
<img src="https://img.shields.io/badge/made%20in-Japan-brightgreen" alt="made in japan">

A server module for implementing a callback for a request receiving word.

It is a dedicated server module of the web server application "hachiware_server".  
To use it, you must first install and configure ``hachiware_server``.

You can install hachiware_server with the following command.

```
npm i hachiware_server
```

The server module can be installed with the following npm command.

```
npm i hachiware_server_module_callback
```

After installation, you will need the hachiware server configuration file.
See [here](https://github.com/masatonakatsuji2021/hachiware_server) for the procedure for using hachiware_server.

---

### # Setting method

Open the configuration file ``conf/conf.js`` etc. on the hachiware server and open it.
Confirm that ``hachiware_server_module_callback`` is added in `` modules``.

```javascript
modules: [
    ...
    "hachiware_server_module_callback",
    ...
],
```

Then specify ``callbacks`` as shown below.

```javascript
callbacks: {
    access: function(req,res){

		if(req.url == "/error"){
			throw Error("Error Test 2021");
		}

		res.write("welcome to server.");
		res.end();
	},
	error: function(exception, req, res){

		res.write("ERROR");
		res.write(exception.stack.toString());
		res.end();

	},
},
```

``access`` is a callback when a request is received,   
and ``error`` is a callback that is executed when an error occurs in throw etc. after receiving the request.

In ``access``, specify the request object and response object as arguments.  
The contents of this object are basically the same as the createServer callback in the ``http`` module and the ``https`` module.

In the following cases, if you request a URL other than ``/error``, "welcome to server." Will be output and the process will end.

Only when requested by the URL of ``/error``, throw is generated on a trial basis.

```javascript
    ....
    access: function(req,res){

		if(req.url == "/error"){
			throw Error("Error Test 2021");
		}

		res.write("welcome to server.");
		res.end();
	},
    ....
```

In the ``error`` callback, the arguments are specified in the order of exception, request object, and response object.  
Since error information is included in exception, it can be output when the error is displayed on the screen depending on the debugging status.

```javascript
    ...
	error: function(exception, req, res){

		res.write("ERROR");
		res.write(exception.stack.toString());
		res.end();

	},
    ...
```

---

## # Life Cycle

The life cycle of this server module is as follows:

```code
(server listen start)
    |
load fook start 
    |
(request)
    |
load fook access
    |
access callback action                      <= Execute access callback.
            |
            |   * If an error occurs
            |
    load fook error                         <= Execute error callback.
            |
    error callback action
    ...
    |
    | * Quit the server
    |
load fook end
    |
(server listen exit)
```

* "Load hook start" executes the start hook of each server module.  
* "load fook access" executes the access hook of each sserver module.  
* "load fook error" executes the error hook of the server module.
* "Load hook end" executes the end hook of each server module.  

---

hachiware_server_module_callback

A server module for implementing a callback for a request receiving word.
 
License : MIT License.   
Author  : Nakatsuji Masato  
HP URL  : [https://hachiware-js.com/](https://hachiware-js.com/)  
GitHub  : [https://github.com/masatonakatsuji2021/hachiware_server_module_callback](https://github.com/masatonakatsuji2021/hachiware_server_module_callback)  
npm     : [https://www.npmjs.com/package/hachiware_server_module_callback](https://www.npmjs.com/package/hachiware_server_module_callback)