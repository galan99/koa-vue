const login = async function(ctx){
	const data = ctx.request.body;//post
	if(data.username != 'admin'){
		ctx.body = {
			code: 1,
		    msg: '账号不正确！'
		}
		ctx.cookies.set('username','',{signed:false,maxAge:0})
		return;
	}
	if(data.password != 123){
		ctx.body = {
			code: 1,
		    msg: '密码不正确！'
		}
		ctx.cookies.set('username','',{signed:false,maxAge:0})
		return;
	}
	ctx.cookies.set(
      'username', 
      'admin',
      {
        //domain: 'localhost',  // 写cookie所在的域名
        //path: '/',       // 写cookie所在的路径
        maxAge: 1 * 24 * 60 * 60 * 1000, // cookie有效时长 1天
        expires: new Date('2018-02-15'),  // cookie失效时间
        httpOnly: false,  // 是否只用于http请求中获取
        overwrite: false  // 是否允许重写
      }
    )
	ctx.body = {
		code: 0,
	    msg: '登录成功！'
	}
}

module.exports = {
  login
}