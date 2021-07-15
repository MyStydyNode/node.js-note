# 06_mongodb查询

### 知识点

#### find 方法

- 查询数据库所有的数据

  ```js
  await Product.find()
  ```

##### limit 方法 

  - 限制数据的条数，参数为数值类型

    ```js
    await Product.find().limit(2) //数据只有两条了
    ```

##### skip方法

- 跳过数据的条数，参数为数值类型

  ```js
  await Product.find().skip(1) //数据跳过第一条了
  ```

##### skip方法和limit方法结合起来是做分页的

```js
await Product.find().skip(1).limit(2) //数据跳过第一条且只显示两条数据
```

##### where 方法

- 查询条件，参数为对象类型(查询的条件)

  ```js
  await Product.find().where({
    title: '产品2' //只有产品2的数据了
  })
  ```

##### sort 方法

- 进行数据排序,参数为对象类型

  - 参数 **{字段：键值(-1/1)}**
  - -1 表示倒叙，1 表示正序

  ```js
  await Product.find().sort({ _id: 1 }) //产品1，产品2，产品3
  ```

#### findById 方法

- 通过id进行查找，查找出来是一个对象

- id是客户端发送请求传过来的参数

  ```js
  /**
   * :id 表示动态变量。后面id是任意字符，然后我们进行捕获过来，起个变量名为id,作为url的查询参数
   * 冒号开头表示任意字符
   */
  app.get('/products/:id', async (req, res) => {
    /**
     * findById方法 通过id进行查找 查找出来是一个对象
     * id是客户端发送请求传过来的参数
     * req.params表示客户端发送请求的url传递过来的所有的参数
     */
    const data = await Product.findById(req.params.id)
    res.send(data)
  })
  ```

  - :id 表示动态变量。后面id是任意字符，然后我们进行捕获过来，起个变量名为id,作为url的查询参数
  - 冒号开头表示任意字符
  - req.params表示客户端发送请求的url传递过来的所有的参数

### 总结

#### server.js

```js
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
  // const data = await Product.find()

  // limit方法是限制数据的条数，参数为数值类型
  // const data = await Product.find().limit(2) //数据只有两条了

  // skip方法是跳过数据的条数，参数为数值类型
  // const data = await Product.find().skip(1) //数据跳过第一条了

  /**
   * skip和limit结合起来是做分页的
   */
  // const data = await Product.find().skip(1).limit(2) //数据跳过第一条且只显示两条数据

  // where 方法表示查询条件，参数为对象类型(查询的条件)
  // const data = await Product.find().where({
  //   title: '产品2' //只有产品2的数据了
  // })

  // sort 方法进行数据排序,参数为对象类型   {字段：键值(-1/1)}
  // -1 表示倒叙，1表示正序
  const data = await Product.find().sort({ _id: 1 }) //产品1，产品2，产品3
  res.send(data)
})

/**
 * 产品详情页接口
 * :id 表示动态变量。后面id是任意字符，然后我们进行捕获过来，起个变量名为id,作为url的查询参数
 * 冒号开头表示任意字符
 */
app.get('/products/:id', async (req, res) => {
  /**
   * findById方法 通过id进行查找 查找出来是一个对象
   * id是客户端发送请求传过来的参数
   * req.params表示客户端发送请求的url传递过来的所有的参数
   */
  const data = await Product.findById(req.params.id)
  res.send(data)
})


// 监听
app.listen(3000, () => {
  console.log('App listening on port 3000');
})
```

