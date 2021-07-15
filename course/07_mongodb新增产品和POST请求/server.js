// 引用express
const express = require('express') //模块化
const app = express() // 建立express实例

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


// 监听
app.listen(3000, () => {
  console.log('App listening on port 3000');
})