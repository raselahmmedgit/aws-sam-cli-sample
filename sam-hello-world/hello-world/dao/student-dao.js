var { success, error, nullError, dataNotFound, addData, addDataFail, editData, editDataFail, deleteData, deleteDataFail, unhandledError } = require("../helper/message-helper");
var { info, warning, ok, fail } = require("../model/result-model");

var dynamodbConfig = require("../config/dynamodb-config");
var AWS = require("aws-sdk");
AWS.config.update({
    region: dynamodbConfig.region,
    endpoint: dynamodbConfig.endpoint
});

let result;
let records;

module.exports = {

    getAllDao: async function (dbTableName, param) {

        try {

            console.log("student-service - getAllDao");
            var docClient = new AWS.DynamoDB.DocumentClient();
            var dynamodbParams = {
                TableName: dbTableName,
            }

            await docClient.scan(dynamodbParams, async function (err, data) {

                if (err) {
                    console.error("student-service - getAllDao - Error: ", err.code, err.message);
                    result = fail(dataNotFound);
                } else {
                    console.log("student-service - getAllDao: ", data);
                    result = ok(success);
                    records = data;
                }

            }).promise();

            return {
                success: result.success,
                message: result.message,
                data: records
            };

        } catch (error) {
            console.error('student-dao - getAllDao - Error: ', error);
            result = fail(unhandledError);
            return result;
        }

    },

    getDao: async function (dbTableName, param) {

        try {

            console.log("student-service - getDao");
            var docClient = new AWS.DynamoDB.DocumentClient();
            var dynamodbParams = {
                TableName: dbTableName,
                Key: {
                    id: parseInt(param.id)
                }
            }

            await docClient.get(dynamodbParams, async function (err, data) {

                if (err) {
                    console.error("student-service - getDao - Error: ", err.code, err.message);
                    result = fail(dataNotFound);
                } else {
                    console.log("student-service - getDao: ", data);
                    result = ok(success);
                    records = data;
                }

            }).promise();

            return {
                success: result.success,
                message: result.message,
                data: records
            };

        } catch (error) {
            console.error('student-dao - getDao - Error: ', error);
            result = fail(unhandledError);
            return result;
        }
        
    },

    addDao: async function (dbTableName, param) {

        try {

            console.log("student-service - addDao");
            var docClient = new AWS.DynamoDB.DocumentClient();
            var dynamodbParams = {
                TableName: dbTableName,
                Item: {
                    "id": parseInt(param.id),
                    "studentname": param.studentname,
                    "emailaddress": param.emailaddress,
                    "dateofbirth": param.dateofbirth
                }
            };
            await docClient.put(dynamodbParams, function (err, data) {
                if (err) {
                    console.error("student-service - addDao - Error: ", err.code, err.message);
                    result = fail(addDataFail);
                } else {
                    console.log("student-service - addDao: ", data);
                    result = ok(addData);
                    records = data;
                }
            }).promise();

            return {
                success: result.success,
                message: result.message,
                data: records
            };

        } catch (error) {
            console.error('student-dao - addDao - Error: ', error);
            result = fail(unhandledError);
            return result;
        }
        
    },

    editDao: async function (dbTableName, param) {

        try {

            console.log("student-service - editDao");
            var docClient = new AWS.DynamoDB.DocumentClient();
            var dynamodbParams = {
                TableName: dbTableName,
                Key: {
                    id: parseInt(param.id)
                },
                Item: {
                    "id": parseInt(param.id),
                    "studentname": param.studentname,
                    "emailaddress": param.emailaddress,
                    "dateofbirth": param.dateofbirth
                }
            };
            await docClient.put(dynamodbParams, function (err, data) {
                if (err) {
                    console.error("student-service - editDao - Error: ", err.code, err.message);
                    result = fail(editDataFail);
                } else {
                    console.log("student-service - editDao: ", data);
                    result = ok(editData);
                    records = data;
                }
            }).promise();

            return {
                success: result.success,
                message: result.message,
                data: records
            };

        } catch (error) {
            console.error('student-dao - editDao - Error: ', error);
            result = fail(unhandledError);
            return result;
        }
        
    },

    deleteDao: async function (dbTableName, param) {

        try {

            console.log("student-service - deleteDao");
            var docClient = new AWS.DynamoDB.DocumentClient();
            var dynamodbParams = {
                TableName: dbTableName,
                Key: {
                    id: parseInt(param.id)
                }
            }
            await docClient.delete(dynamodbParams, function (err, data) {
                if (err) {
                    console.error("student-service - deleteDao - Error: ", err.code, err.message);
                    result = fail(deleteDataFail);
                } else {
                    console.log("student-service - deleteDao: ", data);
                    result = ok(deleteData);
                    records = data;
                }
            }).promise();

            return {
                success: result.success,
                message: result.message,
                data: records
            };

        } catch (error) {
            console.error('student-dao - deleteDao - Error: ', error);
            result = fail(unhandledError);
            return result;
        }
        
    },

}