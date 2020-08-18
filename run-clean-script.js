parcelRequire=function(modules,cache,entry,globalName){var error,previousRequire="function"==typeof parcelRequire&&parcelRequire,nodeRequire="function"==typeof require&&require;function newRequire(name,jumped){if(!cache[name]){if(!modules[name]){var currentRequire="function"==typeof parcelRequire&&parcelRequire;if(!jumped&&currentRequire)return currentRequire(name,!0);if(previousRequire)return previousRequire(name,!0);if(nodeRequire&&"string"==typeof name)return nodeRequire(name);var err=new Error("Cannot find module '"+name+"'");throw err.code="MODULE_NOT_FOUND",err}localRequire.resolve=function(x){return modules[name][1][x]||x},localRequire.cache={};var module=cache[name]=new newRequire.Module(name);modules[name][0].call(module.exports,localRequire,module,module.exports,this)}return cache[name].exports;function localRequire(x){return newRequire(localRequire.resolve(x))}}newRequire.isParcelRequire=!0,newRequire.Module=function(moduleName){this.id=moduleName,this.bundle=newRequire,this.exports={}},newRequire.modules=modules,newRequire.cache=cache,newRequire.parent=previousRequire,newRequire.register=function(id,exports){modules[id]=[function(require,module){module.exports=exports},{}]};for(var i=0;i<entry.length;i++)try{newRequire(entry[i])}catch(e){error||(error=e)}if(entry.length){var mainExports=newRequire(entry[entry.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=mainExports:"function"==typeof define&&define.amd?define((function(){return mainExports})):this.runCleanScript=mainExports}if(parcelRequire=newRequire,error)throw error;return newRequire}({XfpS:[function(require,module,exports){"use strict";
/*;
	@license;
	@module-license:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@copyright:
			Richeve S. Bebedor

			<
				@license-year-range:
					2020-present
				@end-license-year-range
			>

			<
				@contact-detail:
					richeve.bebedor@gmail.com
				@end-contact-detail
			>
		@end-copyright

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license
*/const childProcess=require("child_process"),fs=require("fs"),path=require("path"),util=require("util"),fsAsync=fs.promises,MODULE_DIRECTORY_PATH_REPLACER_PATTERN=new RegExp("{{ @module-directory-path }}","gm"),BASIC_CLEAN_SCRIPT=["(rm -rfv {{ @module-directory-path }}/node_modules || true)","(rm -fv {{ @module-directory-path }}/package-lock.json || true)","npm cache clean --force"].join("&&");module.exports=async function(moduleDirectoryPath,option){try{if("string"==typeof moduleDirectoryPath&&moduleDirectoryPath.length>1){if(moduleDirectoryPath=path.resolve(moduleDirectoryPath),!0===(await fsAsync.stat(moduleDirectoryPath)).isDirectory()){option=option||{};const cleanScript=BASIC_CLEAN_SCRIPT.replace(MODULE_DIRECTORY_PATH_REPLACER_PATTERN,moduleDirectoryPath);return await async function(moduleDirectoryPath,script){try{return await new Promise((function(resolve,reject){childProcess.spawn(script,{cwd:moduleDirectoryPath,stdio:["ignore",process.stdout,process.stdout],shell:!0}).on("close",(function(code){0===code?resolve():reject()}))})),!0}catch(error){return!1}}(moduleDirectoryPath,cleanScript)}throw new Error(["#undefined-module-directory;","cannot run clean script;","undefined module directory;","@module-directory-path:",moduleDirectoryPath+";"])}throw new Error(["#invalid-module-directory-path;","cannot run clean script;","invalid module directory path;","@module-directory-path:",moduleDirectoryPath+";"])}catch(error){throw new Error(["#cannot-run-clean-script;","cannot run clean script;","cannot execute run clean script;","@error-data:",util.inspect(error)+";"])}}},{}]},{},["XfpS"]);