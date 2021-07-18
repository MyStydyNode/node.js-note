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

// 产品新增接口
app.post('/products', async (req, res) => {
  // req.body表示客户用post提交的数据
  const data = req.body
  // mongodb 插入数据到数据库用create方法
  const product = await Product.create(data)
  res.send(product)
})

//产品修改接口
app.put('/products/:id', async (req, res) => {
  // findById 方法 找到选中的产品 
  const product = await Product.findById(req.params.id)
  // 赋值操作 进行修改选中的产品的值
  // product.set()
  product.title = req.body.title
  // 保存这个产品
  await product.save()
  res.send(product)
})


// 监听
app.listen(3000, () => {
  console.log('App listening on port 3000');
})