const db_conf = {
    host: `${process.env.MYSQL_HOST? process.env.MYSQL_HOST: 'localhost'}`,
    user: `${process.env.MYSQL_USR? process.env.MYSQL_USR: 'root'}`,
    password: `${process.env.MYSQL_PASSWORD? process.env.MYSQL_PASSWORD:'347+445+b'}`,
    database: `${process.env.MYSQL_DB? process.env.MYSQL_DB: 'training'}`,
    port: `${process.env.MYSQL_PORT? process.env.MYSQL_PORT: 3306}`,
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