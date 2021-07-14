// 引用express
const express = require('express') //模块化
const app = express() // 建立express实例

//定义路由 两个参数request,response----> 客户端请求和客户端响应
/**
 * 去掉首页
 * app.get('/', (req, res) => {
 * res.send({ page: 'Home' })
 * })
 */
// 静态文件托管 ----->使用一个中间键，用来处理静态文件的托管
// app.use(express.static('public')) // 所有里面的public文件可以直接被访问，http://localhost:3000/index.html
app.use('/static', express.static('public')) //http://localhost:3000/static/index.html
/**
 * 好处：可以定义文件夹的url的路径,默认是根路径，访问路径可控
 */

app.get('/about', (req, res) => {
  res.send({ page: 'About Us' })
})
app.get('/products', (req, res) => {
  res.send([
    { id: 1, title: 'Product A' },
    { id: 2, title: 'Product B' },
    { id: 3, title: 'Product C' }
  ])
})

// 监听
/**
 * 端口号,主机名，回调函数
 * (port: number, hostname:string,callback?: () => void)
 */
app.listen(3000, () => {
  console.log('App listening on port 3000');
})

/**
 * 注意
 * 全局安装nodemon nodejs的热更新
 */