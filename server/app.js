const appKoa = new require('koa')
  , koa = require('koa-router')()
  , path =require('path')
  , serve = require('koa-static')
  , list = require('./routes/list.js'); // 引入auth

app = new appKoa();

// 静态文件serve在koa-router的其他规则之上 
app.use(serve(path.resolve('../dist'))); // 将webpack打包好的项目目录作为Koa静态文件服务的目录

app.use(require('koa-bodyparser')());

app.on('error', function(err, ctx){
  console.log('server error', err);
});

koa.use('/api', list.routes()); // 挂载到koa-router上，同时会让所有的list的请求路径前面加上'/list'的请求路径。

app.use(koa.routes()); // 将路由规则挂载到Koa上。

app.listen(3000,() => {
  console.log('Koa is listening in 3000');
});

module.exports = app;