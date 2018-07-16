// db.js
const Sequelize = require('sequelize'); // 引入sequelize

// 使用url连接的形式进行连接，注意将root: 后面的XXXX改成自己数据库的密码
//mysql://root:123456@localhost/todolist
const Todolist = new Sequelize('todolist', 'root', '123456', {
	host: '127.0.0.1',
	port: 3306,
	dialect: 'mysql',
	logging: false,
    freezeTableName: true,
    operatorsAliases: false,
	pool:{
	    max:5,
	    min:0,
	    idle:10000
	}
})


module.exports = {
  Todolist // 将Todolist暴露出接口方便Model调用
}