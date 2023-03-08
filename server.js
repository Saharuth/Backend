const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const mysql = require("mysql2")
const db_conf = require("./mysql_tool/mysql_config").db_conf
const db_conf_2 = require("./mysql_tool/mysql_config").db_conf_2
const player_route = require('./api_route/player_router')
const login_route = require('./api_route/login_router')
const temp_route = require('./api_route/temp_router')
const picture_route = require('./api_route/picture_router')

global.conn = mysql.createPool(db_conf) //connect ครั้งเดียว -> ใช้ได้ตลอด
//ประกาศเป็น global เพื่อให้ทุกไฟล์สามารถใช้งานได้
global.conn2 = mysql.createPool(db_conf_2)

const app = express()
const port = process.env.MYSQL_PORT? process.env.MYSQL_PORT: 5004

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

app.use(player_route)
app.use(login_route)
app.use(temp_route)
app.use(picture_route)

/** on เป็นการฟังเหตุการณ์ หรือ event  **/
conn.on('connection', (connection) =>{
  let tag = 'db_connection'
  console.log(tag, 'connection established')
  connection.on('error', (err) => {
    console.error(tag, 'MySQL error ', err.code)
  })
  connection.on('close', err => {
    console.error(tag, 'MySQL close ', err)
  })
})

const information_server = [
  {
    username: "lionel",
    password: "123456"
  },
  {
    username: "luis",
    password: "234567"
  },
  {
    username: "toretto",
    password: "345678"
  },
  {
    username: "luke",
    password: "456789"
  }
]

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.get('/hello', (req, res) => {
//   let name = "Hello Guy!!!"

//   let message = {
//     fname: "Saharuth",
//     lname: "Nuallaong",
//     age: 22,
//     tel: "0980147678"
//   }

//   res.send(message)
// })

// app.post('/hello', (req, res) => {
//   let body = req.body
//   console.log("body = ", body)
  
//   let json1 = Reflect.has(req.body, "hello1") ? req.body.hello1 : null;
//   let json2 = Reflect.has(req.body, "hello2") ? req.body.hello2 : null;
//   let json3 = Reflect.has(req.body, "hello3") ? req.body.hello3 : null;

//   let data_rx = {}
//   if (json1 != null && json2 != null && json3 != null){
//     data_rx.hello1 = json1
//     data_rx.hello2 = json2
//     data_rx.hello3 = json3
//     console.log("Data_Body: ", data_rx)

//     //let query = `INSERT INTO table_test (column1, column2, column3) VALUES ('${json1}', ${json2}, ${json3})`
//     let good_req = {
//       status: "success",
//       message: "Create your data success",
//       detail: data_rx
//     }
//     res.status(200).send(good_req)
//   }
//   else {
//     let bad_req = {
//       status: "bad_req",
//       message: "Please check your value"
//     }
//     res.status(400).send(bad_req)
//   }
// })

// app.put('/hello', (req, res) => {
//   let datas = [
//     {
//       fname: "fname1",
//       lname: "lname1"
//     },
//     {
//       fname: "fname2",
//       lname: "lname2"
//     }
//   ]

//   let fname = Reflect.has(req.body, "fname") ? req.body.fname : null
//   let lname = Reflect.has(req.body, "lname") ? req.body.lname : null 

//   //let query = `UPDATE table_test SET fname = '${fname}', lname = '${lname}' WHERE id = 1`

//   datas.forEach((item, index) => {
//     if (index == 0){
//       item.fname = fname
//       item.lname = lname
//     }
//   })
//   console.log(datas)
//   res.status(200).send(datas)
// })

// app.delete('/hello/:id', (req, res) => {
//   let id = parseInt(req.params.id)
  
//   let datas = [
//     {
//       id: 1,
//       fname: "fname1",
//       lname: "lname1"
//     },
//     {
//       id: 2,
//       fname: "fname2",
//       lname: "lname2"
//     }
//   ]

//   let new_arr = []
//   datas.forEach((item, index) => {
//     if(item.id != id){
//       new_arr.push(item)
//     }
//   })
//   console.log(new_arr)
//   res.send(new_arr) 
// })

// /******* data with url *******/
// app.delete('/hello_url', (req, res) => {
//   let data_url = req.query
//   console.log(data_url)
//   let data_id = req.query.id
//   console.log(data_id)
// })

// /** login **/
// app.post('/auth', (req, res) => {
//   let body = req.body
//   console.log(body)
//   let username = Reflect.has(body, "username") ? body.username : null
//   let password = Reflect.has(body, "password") ? body.password : null

//   if ( username != null && password != null){
//     let incorrect = 0
//     information_server.forEach((item, index) => {
//       if (item.username == username && item.password == password){
//         let response = "Welcome to "+ username
//         res.status(200).send(response)
//         incorrect++
//       }
//     })
//     if (incorrect == 0){
//       let response1 = "Username or Password Incorrect!!!"
//       res.status(200).send(response1)
//     }
//   }
// })

// // /**** connect database ****/
// // app.get('/player', (req,res) => {
// //   let query = `SELECT * FROM player`
// //   conn.query(query, (error, results) => {
// //     if (error){
// //       console.log(error)
// //     } else {
// //       console.log(results)
// //       res.send(results)
// //     }
// //   })
// // })

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})