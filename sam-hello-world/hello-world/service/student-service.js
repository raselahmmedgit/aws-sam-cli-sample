var { success, error, nullError, unhandledError } = require("../helper/message-helper");
var { info, warning, ok, fail } = require("../model/result-model");

var { getAllDao, getDao, addDao, editDao, deleteDao } = require("../dao/student-dao");

let dbTableName = "students";

module.exports = {

    getAllStudent: async function (param) {

        try {

            console.log("student-service - getAllStudent");
            if (param === null || typeof param === undefined) {
                return fail(nullError);
            }
            else {
                var result = await getAllDao(dbTableName, param);
                return result;
            }

        } catch (error) {
            console.error('student-service - getAllStudent - Error: ', error);
            result = fail(unhandledError);
            return result;
        }
        
    },

    getStudent: async function (param) {

        try {

            console.log("student-service - getStudent");
            if (param === null || typeof param === undefined) {
                return fail(nullError);
            }
            else {
                var result = await getDao(dbTableName, param);
                return result;
            }

        } catch (error) {
            console.error('student-service - getStudent - Error: ', error);
            result = fail(unhandledError);
            return result;
        }

        
    },

    addStudent: async function (param) {

        try {

            console.log("student-service - addStudent");
            if (param === null || typeof param === undefined) {
                return fail(nullError);
            }
            else {
                var result = await addDao(dbTableName, param);
                return result;
            }

        } catch (error) {
            console.error('student-service - addStudent - Error: ', error);
            result = fail(unhandledError);
            return result;
        }
        
    },

    editStudent: async function (param) {

        try {

            console.log("student-service - editStudent");
            if (param === null || typeof param === undefined) {
                return fail(nullError);
            }
            else {
                var result = await editDao(dbTableName, param);
                return result;
            }

        } catch (error) {
            console.error('student-service - editStudent - Error: ', error);
            result = fail(unhandledError);
            return result;
        }
        
    },

    deleteStudent: async function (param) {

        try {

            console.log("student-service - deleteStudent");
            if (param === null || typeof param === undefined) {
                return fail(nullError);
            }
            else {
                var result = await deleteDao(dbTableName, param);
                return result;
            }

        } catch (error) {
            console.error('student-service - deleteStudent - Error: ', error);
            result = fail(unhandledError);
            return result;
        }
        
    },

}