var { success, error, nullError, tableCreate, tableCreateFail, tableDelete, tableDeleteFail, tableInsert, tableInsertFail, unhandledError } = require("../helper/message-helper");
var { ok, fail } = require("../model/result-model");

var dynamodbConfig = require("../config/dynamodb-config");
var AWS = require("aws-sdk");
AWS.config.update({
    region: dynamodbConfig.region,
    endpoint: dynamodbConfig.endpoint
});

let result;

module.exports = {

    createTable: async function (dbTableName) {

        try {

            console.log("dynamodb-dao - createTable");
            console.log("dynamodb-dao - createTable - TableName: " + dbTableName);

            var dynamodb = new AWS.DynamoDB();
            var dynamodbParams = {
                TableName: dbTableName,
                KeySchema: [
                    { AttributeName: "id", KeyType: "HASH" },  //Partition key
                ],
                AttributeDefinitions: [
                    { AttributeName: "id", AttributeType: "N" },
                ],
                ProvisionedThroughput: {
                    ReadCapacityUnits: 5,
                    WriteCapacityUnits: 5
                }
            };

            await dynamodb.createTable(dynamodbParams, async function (err, data) {

                if (err) {
                    if (err.code === "ResourceInUseException" && err.message === "Cannot create preexisting table") {
                        console.error("dynamodb-dao - createTable - Error: ", err.code, err.message);
                    } else {
                        console.error("dynamodb-dao - createTable - Error: ", err.code, err.message);
                        result = fail(tableCreateFail);
                    }
                } else {
                    console.log("dynamodb-dao - createTable: ", data);
                    result = ok(tableCreate);
                }

            }).promise();

            return {
                success: true,
                message: success,
                description: result
            };
            
        } catch (error) {
            console.error('dynamodb-dao - createTable - Error: ', error);
            result = fail(unhandledError);
            return result;
        }

    },

    insertTable: async function (dbTableName) {

        try {

            console.log("dynamodb-dao - insertTable");
            console.log("dynamodb-dao - insertTable - TableName: " + dbTableName);

            var docClient = new AWS.DynamoDB.DocumentClient();
            var dynamodbParams = {
                TableName: dbTableName,
                Item: {
                    "id": 1,
                    "studentname": "john",
                    "emailaddress": "john@mail.com",
                    "dateofbirth": "1985-10-01 16:17:17"
                }
                //,Item: {
                //    "id": 2,
                //    "studentname": "rasel",
                //    "emailaddress": "rasel@mail.com",
                //    "dateofbirth": "2000-10-01 10:58:33"
                //}
            };
            await docClient.put(dynamodbParams, function (err, data) {
                if (err) {
                    console.error("dynamodb-dao - insertTable - Error: ", err.code, err.message);
                    result = fail(tableInsertFail);
                } else {
                    console.log("dynamodb-dao - insertTable: ", data);
                    result = ok(tableInsert);
                }
            }).promise();

            return {
                success: true,
                message: success,
                description: result
            };

        } catch (error) {
            console.error('dynamodb-dao - insertTable - Error: ', error);
            result = fail(unhandledError);
            return result;
        }

    },

    deleteTable: async function (dbTableName) {

        try {

            console.log("dynamodb-dao - deleteTable");
            console.log("dynamodb-dao - deleteTable - TableName: " + dbTableName);

            var dynamodb = new AWS.DynamoDB();
            var dynamodbParams = {
                TableName: dbTableName
            };

            await dynamodb.deleteTable(dynamodbParams, function (err, data) {

                if (err) {
                    console.error("dynamodb-dao - deleteTable - Error: ", err.code, err.message);
                    result = fail(tableDeleteFail);
                } else {
                    console.log("dynamodb-dao - deleteTable: ", data);
                    result = ok(tableDelete);
                }

            }).promise();

            return {
                success: true,
                message: success,
                description: result
            };

        } catch (error) {
            console.error('dynamodb-dao - deleteTable - Error: ', error);
            result = fail(unhandledError);
            return result;
        }

    }

}