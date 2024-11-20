# API列表
## /request
请求API，由于实现原理，对国外网站有一定加入效果
* 请求方式: `GET` or `GET + POST`
* 参数 host : 请求目标URL
* 示例 /request?host=https://example.com
* POST请求时请使用JSON作为请求主体
* 返回允许跨域访问的页面
## /mail
邮件API，用于发送邮件(SMTP)
* 请求方式: `POST`
* JSON参数
* • host: 邮件服务器
* • uname: 用户名，例如 xxx@xxx.com
* • pw: 密码
* • from: 从xxx发送
* • to: 目标用户邮箱
* • subject: 题目
* • body: 正文
* 返回JSON
* • statu: 是否发送成功
* • error: 错误
* • info: 发送数据
## /ipc
读取 Socket API
* 请求方式: `GET`
* 参数
* • ip: 目标服务器IP和端口，例如 127.0.0.1:3000
* • count: 在第多少次读取到数据时返回数据
* 返回JSON
* • statu: 是否发送成功
* • data: 读取到的数据的数组(每个数据包含string(读取到的字符串)和buffer(整数数组))
* • error: 错误
## /dns
域名DNS解析
* 参数 domain: 域名
* 返回statu和data数组(解析出的ipv4地址数组)