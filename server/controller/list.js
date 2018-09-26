const list = require('../model/list.js');

const getList = async function(ctx){
	const data = ctx.params.id;//get 获取url里传过来的参数
	const result = await list.getList();
	ctx.body = {
	    code: 0,
	    msg: 'success',
	    data: result
	}
}

const removeList = async function(ctx){
	const data = ctx.request.body//post koa-bodyparser中间件可以把koa2上下文的formData数据解析到ctx.request.body中
	const result = await list.removeList(data);
	ctx.body = {
		code: 0,
	    msg: '删除成功！'
	}
}

const addList = async function(ctx){
	const data = ctx.request.body;//post
	const result = await list.addList(data);
	ctx.body = {
		code: 0,
	    msg: '添加成功！'
	}
}

const updateList = async function(ctx){
	const data = ctx.request.body;//post
	const result = await list.updateList(data);
	ctx.body = {
		code: 0,
	    msg: '修改成功！'
	}
}

//返回列表页数
const pageList = async function(ctx) {
	const data = ctx.query;//get 获取url里传过来的参数
	const result = await list.pageList(data);
	ctx.body = {
	    code: 0,
	    msg: 'success',
	    data: {
			list: result.rows,
			count: result.count,
			totalPage: Math.ceil(result.count/data.pageSize)
		}
	}
}

module.exports = {
  getList,
  removeList,
  addList,
  updateList,
  pageList
}