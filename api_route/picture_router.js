const api_version = "/api/v1"
const express = require('express')
const router = express.Router();

module.exports = router;

let res_cam = [

    "96X96",    // 96x96
    "QQVGA",    // 160x120
    "QCIF",     // 176x144
    "HQVGA",    // 240x176
    "240X240",    // 240x240
    "QVGA",     // 320x240
    "CIF",      // 400x296
    "HVGA",     // 480x320
    "VGA",      // 640x480
    "SVGA",     // 800x600
    "XGA",      // 1024x768
    "HD",       // 1280x720
    "SXGA",     // 1280x1024
    "UXGA",     // 1600x1200
    // 3MP Sensors
    "FHD",      // 1920x1080
    "P_HD",     //  720x1280
    "P_3MP",    //  864x1536
    "QXGA",     // 2048x1536
    // 5MP Sensors
    "QHD",      // 2560x1440
    "WQXGA",    // 2560x1600
    "P_FHD",    // 1080x1920
    "QSXGA",    // 2560x1920
];

router.put(api_version + '/picture', (req,res) => {
    let body = req.body;
    let api_key = body.api_key;
    let picture = body.picture;
    let idpic = body.idpic[6];
    let frame_size = res_cam[body.FRAMESIZE];
    
    if (api_key !== null && picture !== null){
        let len_picture = picture.length;
        let number_seg = 0;
        if (len_picture%10000 == 0){
            number_seg = parseInt(len_picture/10000);
        } else {
            number_seg = parseInt(len_picture/10000) + 1;
        }
        for(let i=0; i<number_seg; i++){
            if (i == number_seg - 1){
                let picture_seg = picture.substring((i*10000), len_picture);
                // console.log(picture_seg);
                let query = `UPDATE picturedata SET base64='${picture_seg}', number='${number_seg}', 
                    idpic='${idpic}', resolution='${frame_size}' WHERE id=${i+1};`
                conn2.query(query, (error, results) => {
                    let response = {
                        Status: "OK",
                        Description: "Create data into Database Success",
                        Result: results
                    }
                    if (error){
                        console.log(error)
                    } else {
                        //console.log(response)
                        console.log("Complete");
                        res.status(200).send();
                    }
                })
            } else {
                let picture_seg = picture.substring((i*10000), (i+1)*10000);
                // console.log(picture_seg);
                let query = `UPDATE picturedata SET base64='${picture_seg}', number='${number_seg}', 
                    idpic='${idpic}', resolution='${frame_size}' WHERE id=${i+1};`
                conn2.query(query, (error, results) => {
                    let response = {
                        Status: "OK",
                        Description: "Create data into Database Success",
                        Result: results
                    }
                    if (error){
                        console.log(error)
                    } else {
                        //console.log(response)
                        console.log("Complete");
                        res.status(200).send();
                    }
                })
            }
        }
        // console.log(body);
        
    }
})

router.put(api_version + '/picture_array', (req,res) => {
    let body = req.body;
    if (body !== null){
        for (let x of body){
            let node_number = x.node;
            let picture = x.picture;
            let resolution = res_cam[x.resolution];
            let total_pkt = x.total_pkt;
            let seq_pkt = x.seq_pkt;
            let seq_picture = x.seq_picture;
            let size = x.size;
            // console.log(node_number)
            // console.log(picture)
            if (seq_pkt === total_pkt){
                let query = `UPDATE picturedata SET base64='${picture}', number='start', name=${node_number},
                    idpic=${seq_picture}, resolution='${resolution}' WHERE id=${seq_pkt};`
                conn2.query(query, (error, results) => {
                    let response = {
                        Status: "OK",
                        Description: "Create data into Database Success",
                        Result: results
                    }
                    if (error){
                        console.log(error)
                    } else {
                        //console.log(response)
                        console.log("Complete");
                        res.status(200).send();
                    }
                })
            } else {
                let query = `UPDATE picturedata SET base64='${picture}', number=${total_pkt}, name=${node_number},
                    idpic=${seq_picture}, resolution='${resolution}' WHERE id=${seq_pkt};`
                conn2.query(query, (error, results) => {
                    let response = {
                        Status: "OK",
                        Description: "Create data into Database Success",
                        Result: results
                    }
                    if (error){
                        console.log(error)
                    } else {
                        //console.log(response)
                        console.log("Complete");
                        res.status(200).send();
                    }
                })
            }
        }
    }
    // console.log(body);
})