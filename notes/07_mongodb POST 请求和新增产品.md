# 07_mongodb POST请求和新增产品

### 知识点

#### POST请求

- 在server.js文件中 使用` POST`接口

  >/**
  >
  > \* 获取数据通过最简单的输入url来访问的一种get请求
  >
  > \* 录入数据，提交数据用更安全，运行数据量更大的post请求
  >
  > */

  ```js
  app.post('/products', async (req, res) => {
    // req.body表示客户用post提交的数据
    const data = req.body
    // 发送的什么就返回什么
    /**
     * {
     *   "title":"产品4"
     * }
     */
    res.send(data)
  })
  ```

- 访问`POST` 接口

  >/**
  >
  > \* 如果用浏览器访问的话，访问的是get方法里的 /products 的路径
  >
  > \* 所以需要安装一个扩展 REST Clinet,
  >
  > \* 在vscode中用代码的方式发送http的各种请求，类似于在浏览器中使用 jquery的ajax库 axios请求接口
  >
  > \* 
  >
  > \* 或者 下载postman 软件或者浏览器插件都可以进行调试
  >
  > */

  - vscode 安装扩展 `REST Clinet` / 浏览器安装`postman`插件/下载`postman `软件

  - 在根目录下 创建`test.http` 文件

    - 不使用变量

      ```http
      GET http://localhost:3000/products
      ###
      GET http://localhost:3000/products/60f030fbb02de644b075fd2c
      ```

    - 使用变量

      ```http
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
      {
        "title":"产品4"
      }
      ```

      >> 如果Content-Type: application/json 和 POST {{uri}}products格了一行                                                      
      >
      >> > 则是个空对象
      >
      >>如果Content-Type: application/json 和 发送的数据 没有隔行
      >
      >>> 就会报错   Header name must be a valid HTTP token ["{"]
      >
      >## 总结
      >
      >- rest client报错
      > - Content-Type 和 json字符串中间必须有一个空行 
      > - url和conten-type之间不能有空行

  - 在 server.js 中 允许json 格式提交的数据
  
    ```js
    app.use(express.json()) // 开启 json格式的解析
    ```
  
  - 点击 `GET/POST`方法上面的 `Send Request` 发送请求，在旁边的文件中就可以看到数据了
#### 新增产品

- 在server.js中 的post方法中修改

  ```js
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
  ```

- 在 test.http 中 

  1. 点击`POST` 方法上面的 `Send Request` 发送请求，把数据插入到数据库中
  
     >结果
     >
     > {    "_id": "60f3d7165bd165080c1713a6",    "title": "产品4",    "__v": 0  }
  
  2. 点击`GET` 方法上面的 `Send Request` 发送请求，查询数据
  
     >结果
     >
     >{    "_id": "60f030fbb02de644b075fd2a",    "title": "产品1",    "__v": 0  }, _
     >
     >_ {    "_id": "60f030fbb02de644b075fd2b",    "title": "产品2",    "__v": 0  }, _
     >
     >_ {    "_id": "60f030fbb02de644b075fd2c",    "title": "产品3",    "__v": 0  }, _
     >
     >_ {    "_id": "60f3d7165bd165080c1713a6",    "title": "产品4",    "__v": 0  }
  
  3. 注释或者删除 刚刚发送的数据，新增一条数据，重复1.2 步骤
  
     ```http
     # {
     #   "title":"产品4"
     # }
     {
       "title":"产品5"
     }
     ```
  
     >结果
     >
     > {    "_id": "60f3d7375bd165080c1713aa",    "title": "产品5",    "__v": 0  }
  
     >结果
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
  
  
  #如果Content-Type: application/json 和 POST {{uri}}products格了一行，是个空对象
  #如果Content-Type: application/json 和 发送的数据 没有隔行 就会报错Header name must be a valid HTTP token ["{"]
  #总结：rest client报错 Content-Type 和 json字符串中间必须有一个空行 url和conten-type之间不能有空行
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
  ```
  
  
