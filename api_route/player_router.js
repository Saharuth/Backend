const api_version = "/api/v1"

const express = require('express')
const router = express.Router();

module.exports = router;

/**** connect database ****/
router.get(api_version + '/player', (req,res) => {

    let player_id = Reflect.has(req.query, 'id') ? req.query.id : null

    let query = player_id != null ? `SELECT * FROM player WHERE id_player = ${player_id}` : `SELECT * FROM player`
    
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

router.post(api_version + '/player', (req, res) => {
    let fname = req.body.fname
    let lname = req.body.lname
    let pos = req.body.pos
    let nation = req.body.nation
    let birthday = req.body.birthday
    let id_club = req.body.id_club
    let query = `INSERT INTO player (first_name, last_name, position, nationality, birthday, id_club) 
        VALUES ('${fname}', '${lname}', '${pos}', '${nation}', '${birthday}', '${id_club}')`

    conn.query(query, (error, results) => {
        let response = {
            Status: "OK",
            Description: "Create data into Database Success",
            Result: results
        }
        if (error){
            console.log(error)
        } else {
            console.log(response)
            res.send(response)
        }
    })
})

router.put(api_version + '/player', async (req, res) => {

    let player_id = req.query.id

    let fname = Reflect.has(req.body, "first_name") ? req.body.first_name : null
    let lname = Reflect.has(req.body, "last_name") ? req.body.last_name : null
    
    if (fname != null && lname != null){
        let query_select = `SELECT * FROM player WHERE id_player = ${player_id}`
        await conn.promise().query(query_select).then(([rows]) => {
            //[rows] === rows[0]
            if (rows.length != 0){
                let query = `UPDATE player SET first_name = '${fname}', last_name = '${lname}', updated_at = CURRENT_TIMESTAMP 
                    WHERE id_player = ${player_id}`
                conn.query(query, (error, results) => {
                    if (error){
                        console.error("Internal Server Error: ", error.message)
                        res.status(400).send(error.message)
                    } else {
                        if (results.length !== 0){
                            let response = {
                                Status: "OK",
                                Description: "Update data into Database Success",
                                Result: results
                            }
                            console.log(response)
                            res.send(response)
                        }
                    }
                })
            } else {
                console.info(`Id ${player_id} not found`)
                res.send(`Id ${player_id} not found`)
            }
        }).catch(error => {
            console.error(error.message)
        })
    }
})