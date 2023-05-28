require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const mysql = require("mysql2")
const db_conf = require("./config/database").db_conf
const db_conf_2 = require("./config/database").db_conf_2

const player_route = require('./api_route/player_router')
const login_route = require('./api_route/login_router')
const temp_route = require('./api_route/temp_router')
const picture_route = require('./api_route/picture_router')
const auth = require('./middleware/auth')

global.conn = mysql.createPool(db_conf) //connect ครั้งเดียว -> ใช้ได้ตลอด
global.conn2 = mysql.createPool(db_conf_2) //ประกาศเป็น global เพื่อให้ทุกไฟล์สามารถใช้งานได้

const app = express()
const port = 5004;

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

app.get('/api/v1/welcome', auth, (req, res) => {
  console.log(req)
  res.status(200).send('Welcome to My Website')
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})