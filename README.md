## squelize的使用

npm init -y

install nodemon\express\squelize\squelize-cli

初始化：npx sequelize-cli init

设置config配置文件：配置数据库信息

create a model named User：npx sequelize-cli model:generate --name User --attributes name:string；这样models文件夹就会多一个user.js，这个就是user模型；同时migrations也会生成文件，这个文件里的内容就是用来创建数据表的；

models/index.js：引入config并遍历models下所有的模型；

将squelize集成的东西在express中跑起来；squelize已经把底层封装好了，所以上层直接使用模型即可；

创建模型之后数据库并没有生成模型对应的数据表，可以执行npx sequelize-cli db:migrate生成数据表；另外后面可以更一个环境变量，对应config的环境设置，比如npx sequelize-cli db:migrate --env=development，这时就会连接数据库并且初始化数据表；（这时会提示说Please install mysql2 package manually，）

node与数据库之间需要有一个驱动: 
node应用 -> 驱动 -> mysql db (这个驱动就是上面提示的mysql2)
node应用 -> orm -> 驱动 -> mysql db
所以还需要安装驱动mysql2

执行命令创建数据表

在node进行操作

```javascript
app.get('/create', async (req, res) => {
  let {name} = req.query;
  // squelize api返回promise
  let user = await models.User.create({
    name
  })
  console.log(user)
  res.json({
    message: '创建成功'
  })
})

app.get('/list', async (req, res) => {
  let lists = await models.User.findAll();
  res.json({
    lists
  })
})

app.get('/detail/:id', async (req, res) => {
  let {id} = req.params;
  let user = await models.User.findOne({
    where: {
      id
    }
  });
  res.json({
    user
  })
})
```







