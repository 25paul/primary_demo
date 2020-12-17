const express = require('express')
const app = express()
const port = 3000

const models = require('./models')

console.log(models.User)

app.get('/', (req, res) => res.send('Hello World!'))

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))