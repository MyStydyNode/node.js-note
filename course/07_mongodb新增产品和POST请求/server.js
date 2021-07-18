// 引用express
const express = require('express') //模块化
const app = express() // 建立express实例

// 允许json格式提交的数据
app.use(express.json()) // 开启 json格式的解析

//引用mongoose
const mongoose = require('mongoose') //模块化
//连接数据库
mongoose.connect('mongodb://localhost:27017/express-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

//定义模型
const Product = mongoose.model('Product', new mongoose.Schema({
  title: String,
}))

// 数据库插入数据
// insertMany 插入多条数据, 只需要执行一次, 他会进行循环插入
// Product.insertMany([
//   { title: '产品1' },
//   { title: '产品2' },
//   { title: '产品3' },
// ])

//解决跨域问题
app.use(require('cors')())

//定义路由 两个参数request,response----> 客户端请求和客户端响应
app.use('/', express.static('public'))

app.get('/about', (req, res) => {
  res.send({ page: 'About Us' })
})

//产品列表接口
app.get('/products', async (req, res) => {
  // 异步操作
  // 查询所有的数据
  const data = await Product.find()
  res.send(data)
})

// 产品详情页接口
app.get('/products/:id', async (req, res) => {
  const data = await Product.findById(req.params.id)
  res.send(data)
})

/**
 * 产品新增接口
 * 获取数据通过最简单的输入url来访问的一种get请求
 * 录入数据，提交数据用更安全，运行数据量更大的post请求
 */
app.post('/products', async (req, res) => {
  // req.body表示客户用post提交的数据
  const data = req.body
  // 发送的什么就返回什么
  /**
   * {
   *   "title":"产品4"
   * }
   */

  // mongodb 插入数据到数据库用create方法
  const product = await Product.create(data)
  /**
   * {
   *  "_id": "60f030fbb02de644b075fd2c",
   *  "title": "产品3",
   *  "__v": 0
   * }
   */
  res.send(product)
})

/**
 * 访问接口
 * 如果用浏览器访问的话，访问的是get方法里的 /products 的路径
 * 所以需要安装一个扩展 REST Clinet,
 * 在vscode中用代码的方式发送http的各种请求，类似于在浏览器中使用 jquery的ajax库 axios请求接口
 * 
 * 或者 下载postman 软件或者浏览器插件都可以进行调试
 */

// 监听
app.listen(3000, () => {
  console.log('App listening on port 3000');
})