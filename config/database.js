const db_conf = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    port: process.env.MYSQL_PORT,
    timezone: "+00:00",
}

const db_conf_2 = {
    host: "localhost",
    user: "root",
    password: "347+445+b",
    database: "test",
    port: 3306,
    timezone: "+00:00",
}

module.exports = { db_conf, db_conf_2 }