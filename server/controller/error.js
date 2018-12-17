const listModel = require('../model/error.js');

const addList = async function(ctx){
	const data = ctx.query;
	//const data = ctx.request.body; //post koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
	const result = await listModel.addList(data);
	ctx.body = {
		code: result ? 0 : -1,
	    msg: result ? '添加成功！' : '请求过快，请稍后再试！'
	}
}

const pageList = async function(ctx){
	const data = ctx.query;//get 获取url里传过来的参数
	const result = await listModel.getList(data);
	ctx.body = {
	    code: 0,
	    msg: 'success',
	    data: result
	}
}

module.exports = {
  pageList,
  addList,
}