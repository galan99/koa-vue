// models/user.js
const request = require('request');
const sourceMap = require('source-map');

const db = require('../config/db.js'), 
      listModel = '../mysql/error.js'; // 引入user的表结构
const TodolistDb = db.Todolist; // 引入数据库

const List = TodolistDb.import(listModel); // 用sequelize的import方法引入表结构，实例化了User。


//返回列表页数
const getList = async function(params) {
	//pageSize 每页10条数据 page 页数
	let {pageSize, page, type} = params;
	let findJson = {};
	if(type){
		findJson.type = type;
	}
	const list = await List.findAndCountAll({
			where: findJson,
			limit: pageSize*1,
			offset: pageSize*(page - 1),
	})
	return list
}



//读取map文件
function showMap(url, info){
	//const fs = require('fs');
	//let fileUrl = './main.js.map'; // 本地map文件路径
	//var rawSourceMapJsonData = fs.readFileSync(fileUrl, 'utf-8').toString();
	//var consumer = await new sourceMap.SourceMapConsumer(rawSourceMapJsonData);
	//console.log(consumer.originalPositionFor({line: 1, column:2363}))
  
	return new Promise(function (resolve, reject) {
	  request.get(url, async function (error, response, body) {
		if (!error && response.statusCode == 200) {
		  var consumer = await new sourceMap.SourceMapConsumer(body);
		  resolve(consumer.originalPositionFor({line: info.line, column: info.column}))
		}else {
		  reject(error)
		}
	  });
	})
}

//创建一条数据
let timeNow = 0;
let sameErr = '';
const addList = async function(data){
	let {err, type, ua, mapUrl} = data;
	if(mapUrl && mapUrl.indexOf('js.map') != -1 ){
		let errorInfo = JSON.parse(err); //解析错误信息
		const mapResult = await showMap(mapUrl, {line: errorInfo.lineNo, column:errorInfo.columnNo});

		// 将异常上报至后台
		err = JSON.stringify({
			errorMessage: errorInfo.errorMessage, // 报错信息
			source: mapResult.source, // 报错文件路径
			line: mapResult.line, // 报错文件行号
			column: mapResult.column, // 报错文件列号
			stack: errorInfo.stack // 报错堆栈
		})
		
	}

	if(new Date().getTime() - timeNow < 1e3 * 5){
		//过滤重复请求
		return false;
	}

	if(err == sameErr){
		//过滤重复请求
		return false;
	}

	//console.log('上次的时间' + timeNow + '，当前时间' + new Date().getTime())

	if(!type || !err || !ua){
		return false;
	}

	const result = await List.create({
		type: type,
		err: err,
		ua: ua,
	})
	timeNow = new Date().getTime();
	sameErr = err;
	return true
}

module.exports = {
  addList,
  getList,
}