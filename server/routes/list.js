
const list = require('../controller/list.js');
const login = require('../controller/login.js');  
const router = require('koa-router')();

router.post('/list/add', list.addList);//添加记录
router.post('/list/remove', list.removeList);//删除记录
router.post('/list/update', list.updateList);//更新记录
router.get('/list/get', list.getList);//获取记录
router.get('/list/page', list.pageList);//获取记录分页

router.post('/login', login.login);//登录


module.exports = router; // 把router规则暴露出去