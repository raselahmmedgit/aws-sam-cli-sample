var { success, error, nullError, unhandledError } = require("../helper/message-helper");
var { info, warning, ok, fail } = require("../model/result-model");

var { createTable, insertTable, deleteTable } = require("../dao/dynamodb-dao");

let dbTableName = "students";

module.exports = {

    createStudentTable: async function () {

        try {

            console.log("dynamodb-service - createStudentTable");
            if (param === null || typeof param === undefined) {
                return fail(nullError);
            }
            else {
                var result = await createTable(dbTableName);
                return result;
            }

        } catch (error) {
            console.error('dynamodb-service - createStudentTable - Error: ', error);
            result = fail(unhandledError);
            return result;
        }
        
    },

    insertStudentTable: async function () {

        try {

            console.log("dynamodb-service - insertStudentTable");
            if (param === null || typeof param === undefined) {
                return fail(nullError);
            }
            else {
                var result = await insertTable(dbTableName);
                return result;
            }

        } catch (error) {
            console.error('dynamodb-service - insertStudentTable - Error: ', error);
            result = fail(unhandledError);
            return result;
        }
        
    },

    deleteStudentTable: async function () {

        try {

            console.log("dynamodb-service - deleteStudentTable");
            if (param === null || typeof param === undefined) {
                return fail(nullError);
            }
            else {
                var result = await deleteTable(dbTableName);
                return result;
            }

        } catch (error) {
            console.error('dynamodb-service - deleteStudentTable - Error: ', error);
            result = fail(unhandledError);
            return result;
        }
        
    }

}