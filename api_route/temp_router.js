const api_version = "/api/v1"

const express = require('express')
const router = express.Router();

module.exports = router;

router.get(api_version + '/temp', (req,res) => {

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

router.post(api_version + '/temp', (req,res) => {

    let body = req.body;
    temp = body.temp;
    humd = body.humidity;
    mac = body.mac;

    if (temp != null && humd != null && mac != null){
        let query = `INSERT INTO temp (temp_sensor, humidity_sensor, mac_address) VALUES ('${temp}', '${humd}', '${mac}')`
        
        conn.query(query, (error, results) => {
            if (error){
                console.log(error)
            } else {
                console.log(results)
                res.send(results)
            }
        })
    }
})