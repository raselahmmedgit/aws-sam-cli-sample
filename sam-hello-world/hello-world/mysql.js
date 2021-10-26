var { currentDateTime } = require('./module');
var { success, error } = require('./helper/message-helper');
var { info, warning, fail, ok } = require('./model/result-model');

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

var AWS = require("aws-sdk");

let response;

exports.lambdaHandler = async (event, context) => {
    try {
        console.log('Start: mysql - lambdaHandler');

        var description = ('Current Date Time: ' + currentDateTime);

        con.connect();
        var sql = "select * from students";
        con.query(sql, function (error, results, fields) {
            if (error) throw error;

            console.log('students from local mysql: ', results[0]);
            const data = results[0];
            const response = {
                statusCode: 200,
                body: JSON.stringify({
                    success: true,
                    message: 'local mysql!',
                    description: description,
                    data: data,
                }),
            };

            con.end();

            callback(null, response);
        });

        console.log('End: mysql lambdaHandler');

    } catch (err) {
        console.log(err);
        var resultModel = fail(error);
        response = {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                message: error,
                description: resultModel
            }),
        };
    }

    return response
};
