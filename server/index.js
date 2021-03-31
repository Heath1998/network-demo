var express = require('express')
var app = express()
var cookieParser = require('cookie-parser')


app.use(cookieParser())
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})
app.get('/data', function (req, res) {
  console.log(req.cookies);
  res.send({hello:'hello, world'});
})



app.get('/cookie', (req, res, next) => {
  // express自带的设置Cookie方法
  res.cookie('userName', 'lee', {
    // 设置该Cookie只可以由服务端访问，即前端JavaScript无法访问document.cookie获取该值，但控制台还是可以查看和修改
    // httpOnly: true,
    // 只有通过HTTPS请求的Cookie才被使用，否则都认为是错误的Cookie
    // secure: true,
    // 设置保存Cookie的域名，浏览器查找Cookie时，子域名（如translate.google.com）可以访问主域名（google.com）下的Cookie，而主域名（google.com）不可以访问子域名（如translate.google.com）下的Cookie
    // 本地测试可直接设置为localhost
    domain: 'localhost',
    // 设置保存Cookie的路径，浏览器查找Cookie时，子路径（如/map）可以访问根路径（'/'）下设置的Cookie，而根路径（'/'）无法访问子路径（如/map）下设置的Cookie
    path: '/',
    // 通过expires设置Cookie过期时间为14天后
    // expires: new Date(new Date().getTime() + 14 * 86400000),
    // 通过maxAge设置Cookie过期时间为14天后
    maxAge: 14 * 86400000,
  })

  // 读取cookieParser解析的Cookie
  
  console.log(req.param);
  res.send(`cookies: ${JSON.stringify(req.cookies)}`)
})

var bodyParser = require('body-parser');



app.post('/data',  function (req, res) {
  console.log(req.data);
  console.log(req.header);
  console.log(req.contentType);
  res.send({hello:'hello, world'});
})




app.listen(3000, () => {
  console.log('Server is running on http://localhost:8080')
})