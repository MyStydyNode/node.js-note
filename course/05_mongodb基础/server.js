// 引用express
const express = require('express') //模块化
const app = express() // 建立express实例

//引用mongoose
const mongoose = require('mongoose') //模块化
/**
 * 连接数据库
 * 数据库地址(固定格式：'mongodb://'+ip地址[默认端口号：27017]/+数据库的名称),可选参数
 * (uri: string, options: mongoose.ConnectOptions, callback: (err: mongoose.NativeError) => void): void (+2 overloads)
 */
mongoose.connect('mongodb://localhost:27017/express-test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
/**
 * 警告：
 * (node:10180) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true 
 * } to MongoClient.connect.
 * 表示使用以前这种url已经过时，需要加这个参数
 */
/**
 * 好处：
 * 在mongodb中，数据库以及数据库里面的东西自己会创建，数据库的名称期任意名字都可以
 */

//定义模型
/**
 * 模型名称，表结构
 * model(name: string, schema?: mongoose.Schema<any, mongoose.Model<any, any, any>, undefined, any>, collection?: string, skipInit?: boolean): mongoose.Model<any, {}, {}>
 */
const Product = mongoose.model('Product', new mongoose.Schema({
  title: String,
}))
/**
 * 表结构：
 * 定义字段（属性）
 * Schema(definition?: {}, options?: mongoose.SchemaOptions): mongoose.Schema<any, mongoose.Model<any, any, any>, undefined, any>
 */

// 数据库插入数据
//insertMany 插入多条数据,只需要执行一次,他会进行循环插入
// Product.insertMany([
//   { title: '产品1' },
//   { title: '产品2' },
//   { title: '产品3' },
// ])

//解决跨域问题
//require 是一个函数
app.use(require('cors')())

//定义路由 两个参数request,response----> 客户端请求和客户端响应
app.use('/', express.static('public'))

app.get('/about', (req, res) => {
  res.send({ page: 'About Us' })
})
app.get('/products', async (req, res) => {
  // res.send([
  //   { id: 1, title: 'Product A' },
  //   { id: 2, title: 'Product B' },
  //   { id: 3, title: 'Product C' }
  // ])
  // 异步操作
  res.send(await Product.find())
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