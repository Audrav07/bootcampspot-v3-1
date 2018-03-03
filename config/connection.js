var mysql = require("mysql2");
var connection = mysql.createConnection({
    port: 3306,
    host: "codeflink.net",
    user: "bootcampspot",
    password: "LfkEAkNNP2v1",
    database: "bootcampspot"
});
// Make connection.
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id" + connection.threadId);
});
// Export connection for our ORM to use.
module.exports = connection;