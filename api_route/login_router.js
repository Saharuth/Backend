const api_version = "/api/v1"

const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router();
const saltRounds = parseInt(process.env.HASH_SALT)
const secret = process.env.SECRET

module.exports = router;

router.get(api_version + '/login', (req,res) => {
  let user_id = Reflect.has(req.query, 'id') ? req.query.id : null
  let query = user_id != null ? `SELECT * FROM user WHERE id_user = ${user_id}` : `SELECT * FROM user`
  /*** Method 1 ***/
  conn.query(query, (error, results) => {
    if (error){
      console.log(error)
    } else {
      console.log(results)
      res.send(results)
    }
  })
  /*** Method 2 ***/
  // conn.promise().query(query).then(([result]) => {
  //     console.log("result: ", result)
  //     res.send(result)
  // }).catch(error => {
  //     console.error(error.message)
  // })
})

router.post(api_version + '/login', (req,res) => {
  let username = req.body.username
  let password = req.body.password
  if (username != null && password != null){
    let query = `SELECT * FROM user WHERE username = '${username}'`
    conn.query(query, (error1, result1) => {
      if (error1){
        res.send({
          status: 'error',
          message: error1
        })
      } else {
        if (result1.length > 0){
          result1.forEach(item => {
            if (item.username === username){
              bcrypt.compare(password, item.password, (error2, success) => {
                if (success){
                  let token = jwt.sign({
                    email: item.email,
                    username: item.username,
                  }, secret, {
                    expiresIn: '1h'
                  })
                  res.send({
                    status: "OK",
                    message: "Welcome to My Website",
                    access_token: token
                  })
                  return
                } else {
                  res.send({
                    status: 'error',
                    message: 'Password Invalid!'
                  })
                  return
                }
              })
            }
          })
        } else {
          res.send('User Not Found!')
        }
      }
    })
  } else {
    res.status(400).send('Please complete the information.')
  }
})

router.post(api_version + '/register', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  if (username != null && password != null && email != null){
    let query_select = `SELECT * FROM user WHERE username = '${username}' OR email = '${email}'`
    conn.query(query_select, (error1, result_1) => {
      if (error1){
        res.send({
          status: 'error',
          message: error1
        })
      } else {
        if (result_1.length > 0){
          res.send('Username and Email already exists in the system!')
        } else {
          bcrypt.hash(password, saltRounds, (err1, hash) => {
            let query_insert = `INSERT INTO user (username, password, email) VALUES ('${username}','${hash}','${email}')`
            conn.query(query_insert, (err2, result_2) => {
              if (err2)
                res.send({
                  status: 'error',
                  message: err2
                })
              else 
                res.status(201).send({
                  status: 'Success',
                  message: result_2,
                  data: req.body
                })
            })
          })
        }
      }
    })
  } else {
    res.status(401).send('Please complete the information.')
  }
})

router.post(api_version + '/auth', (req, res) => {
  try {
    let token = req.headers.authorization.split(' ')[1]
    let decoded_token = jwt.verify(token, secret)
    res.send({
      status: 'Success',
      data: decoded_token
    })
  } catch (err) {
    res.send({
      status: 'error',
      message: err.message
    })
  }
})