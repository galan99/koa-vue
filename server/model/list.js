// models/user.js
const db = require('../config/db.js'), 
      listModel = '../mysql/list.js'; // 引入user的表结构
const TodolistDb = db.Todolist; // 引入数据库

const List = TodolistDb.import(listModel); // 用sequelize的import方法引入表结构，实例化了User。

const getUserById = async function(id){
	const userInfo = await List.findOne({
		where: {
			id: id
		}
	});
	return userInfo // 返回数据
}

//返回列表页数
const pageList = async function(params) {
	//pageSize 每页10条数据 page 页数
	let {pageSize, page} = params;
	const list = await List.findAndCountAll({
			limit: pageSize*1,
			offset: pageSize*(page - 1),
	})
	return list
}


//返回列表
const getList = async function(){
	const list = await List.findAll();
	return list
}

//删除一条
const removeList = async function(data){
	const result = await List.destroy({
		where: {
			id: data.id,
			user_id: data.userId
		}
	})
	return true
}

//创建一条
const addList = async function(data){
	const result = await List.create({
		user_id: data.user_id,
		content: data.content,
		status:1,
	})
	return true
}

//更新一条
const updateList = async function(data){
	const result = await List.update(
		{
		  content:data.content
		},
		{
		  where: {
		    id: data.id,
		    user_id: data.userId
		  }
		}
	)
	return true
}

module.exports = {
  getList,
  removeList,
  addList,
	updateList,
	pageList
}