var moduleDateTime = require('./module');
var dbConfig = require('./config/db-config');
var mysql = require('mysql');
var con = mysql.createConnection({
    host: dbConfig.databaseHost,
    post: dbConfig.databasePort,
    user: dbConfig.databaseUsername,
    password: dbConfig.databasePassword,
    database: dbConfig.databaseName,
    dialect: dbConfig.dialect
});

let response;

exports.lambdaHandler = async (event, context) => {
    try {
        console.log('Start: mysql - lambdaHandler');

        var content = ('Current Date Time: ' + moduleDateTime.currentDateTime());

        con.connect();
        var sql = "select * from students";
        con.query(sql, function (error, results, fields) {
            if (error) throw error;

            console.log('students from local mysql: ', results[0]);
            const data = results[0];
            const response = {
                statusCode: 200,
                body: JSON.stringify({
                    message: 'local mysql!',
                    content: content,
                    data: data,
                }),
            };

            con.end();

            callback(null, response);
        });

        console.log('End: mysql lambdaHandler');

    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
