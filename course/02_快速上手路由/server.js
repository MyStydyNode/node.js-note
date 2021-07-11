// 引用express
const express = require('express') //模块化
const app = express() // 建立express实例

//定义路由 两个参数request,response----> 客户端请求和客户端响应
app.get('/', (req, res) => {
  res.send({ page: 'Home' })
})
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