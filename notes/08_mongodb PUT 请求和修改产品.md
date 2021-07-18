# 08_mongodb PUT 请求和修改产品

### 知识点

- 在server.js 文件中 使用`PUT` 接口

  >/**
  >
  > \* 用patch/put 接口
  >
  > \* patch 表示部分修改
  >
  > \* put 表示直接整个覆盖
  >
  > \* 
  >
  > \* 如果没有那么细致，一般用put
  >
  > */

  ```js
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
  ```

- 在test.http 文件中 

  - 新增访问`POST` 接口

    ```js
    PUT {{uri}}products/60f3ef1d8962e20d14099e56
    # 如果是ajax库可能不需要以下这个请求头
    Content-Type: application/json
    
    # 表示接下来发送json数据了
    {
      "title":"产品55"
    }
    ```

  1. 点击`POST` 方法上面的 `Send Request` 发送请求，把修改的数据插入到数据库中

     >结果：
     >
     >{    "_id": "60f3d7375bd165080c1713aa",    "title": "产品55",    "__v": 0  }

  2. 点击`GET` 方法上面的 `Send Request` 发送请求，查询数据

     >结果：
     >
     >{    "_id": "60f030fbb02de644b075fd2a",    "title": "产品1",    "__v": 0  }, _
     >
     >_ {    "_id": "60f030fbb02de644b075fd2b",    "title": "产品2",    "__v": 0  }, _
     >
     >_ {    "_id": "60f030fbb02de644b075fd2c",    "title": "产品3",    "__v": 0  }, _
     >
     >_ {    "_id": "60f3d7165bd165080c1713a6",    "title": "产品4",    "__v": 0  }, _
     >
     >__ {    "_id": "60f3d7375bd165080c1713aa",    "title": "产品55",    "__v": 0  }

  3. 注释或者删除 刚刚发送的数据，新增一条数据，重复1.2 步骤

     ```http
     # {
     #   "title":"产品55"
     # }
     {
       "title":"产品5"
     }
     ```

     >结果
     >
     >{    "_id": "60f3d7375bd165080c1713aa",    "title": "产品5",    "__v": 0  }

     >结果：
     >
     >{    "_id": "60f030fbb02de644b075fd2a",    "title": "产品1",    "__v": 0  }, _
     >
     >_ {    "_id": "60f030fbb02de644b075fd2b",    "title": "产品2",    "__v": 0  }, _
     >
     >_ {    "_id": "60f030fbb02de644b075fd2c",    "title": "产品3",    "__v": 0  }, _
     >
     >_ {    "_id": "60f3d7165bd165080c1713a6",    "title": "产品4",    "__v": 0  }, _
     >
     >__ {    "_id": "60f3d7375bd165080c1713aa",    "title": "产品5",    "__v": 0  }

- **注意**

  - 修改数据id要保持一致

### 总结

##### test.http

```http
# GET http://localhost:3000/products
# ###
# GET http://localhost:3000/products/60f030fbb02de644b075fd2c

@uri = http://localhost:3000/
###
GET {{uri}}products
###
GET {{uri}}products/60f030fbb02de644b075fd2c
###
POST {{uri}}products
# 如果是ajax库可能不需要以下这个请求头
Content-Type: application/json

# 表示接下来发送json数据了
# {
#   "title":"产品4"
# }
{
  "title":"产品5"
}
###
PUT {{uri}}products/60f3ef1d8962e20d14099e56
# 如果是ajax库可能不需要以下这个请求头
Content-Type: application/json

# 表示接下来发送json数据了
# {
#   "title":"产品55"
# }
{
  "title":"产品5"
}
```

##### server.js

```js
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

/**
 * 产品修改接口
 * 用patch/put 接口
 * patch 表示部分修改
 * put 表示直接整个覆盖
 * 
 * 如果没有那么细致，一般用put
 */
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
```

