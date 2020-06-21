/*
 * 基础配置模块
 */

module.exports = {
  port: 99, //端口
  mysql : {
    host     : 'localhost',  //数据库所在服务器的域名或IP地址
	user     : 'root',  //登录数据库的账号
	password : 'root',      //登录数据库的密码
	database : 'librarymanage'   //我创建的那个数据库的名字
  },
};