var { success, error, nullError } = require("../helper/message-helper");
var { info, warning, ok, fail } = require("../model/result-model");
var { createStudentTable, insertStudentTable, deleteStudentTable } = require("../service/dynamodb-service");
var { getAllStudent, getStudent, addStudent, editStudent, deleteStudent } = require("../service/student-service");

let response;

module.exports = {

    dynamodbController: async function (param) {

        try
        {

            console.log("Start: dynamodbController");

            if (param === null || typeof param === undefined) {
                return fail(nullError);
            }
            else {

                const controllername = param.controllername;

                if (controllername == "DynamoDb") {

                    var result;

                    const methodname = param.methodname;
                    const methodparam = param.methodparam;

                    switch (methodname) {
                        case "CreateStudentTable":
                            console.log("Start: dynamodbController - CreateStudentTable");

                            var result = await createStudentTable();

                            response = {
                                statusCode: 200,
                                body: JSON.stringify(result)
                            };

                            break;
                        case "InsertStudentTable":
                            console.log("Start: dynamodbController - InsertStudentTable");

                            var result = await insertStudentTable();

                            response = {
                                statusCode: 200,
                                body: JSON.stringify(result)
                            };

                            break;
                        case "DeleteStudentTable":
                            console.log("Start: dynamodbController - DeleteStudentTable");

                            var result = await deleteStudentTable();

                            response = {
                                statusCode: 200,
                                body: JSON.stringify(result)
                            };

                            break;
                        case "GetAllStudent":
                            console.log("Start: dynamodbController - GetAllStudent");

                            var result = await getAllStudent(methodparam);

                            response = {
                                statusCode: 200,
                                body: JSON.stringify(result)
                            };

                            break;
                        case "GetStudent":
                            console.log("Start: dynamodbController - GetStudent");

                            var result = await getStudent(methodparam);

                            response = {
                                statusCode: 200,
                                body: JSON.stringify(result)
                            };

                            break;
                        case "AddStudent":
                            console.log("Start: dynamodbController - AddStudent");

                            var result = await addStudent(methodparam);

                            response = {
                                statusCode: 200,
                                body: JSON.stringify(result)
                            };

                            break;
                        case "EditStudent":
                            console.log("Start: dynamodbController - EditStudent");

                            var result = await editStudent(methodparam);

                            response = {
                                statusCode: 200,
                                body: JSON.stringify(result)
                            };

                            break;
                        case "DeleteStudent":
                            console.log("Start: dynamodbController - DeleteStudent");

                            var result = await deleteStudent(methodparam);

                            response = {
                                statusCode: 200,
                                body: JSON.stringify(result)
                            };

                            break;
                        default:
                            console.log("Start: dynamodbController - GetAllStudent");

                            var result = await getAllStudent(methodparam);

                            response = {
                                statusCode: 200,
                                body: JSON.stringify(result)
                            };
                            break;
                    }
                    
                }
                else {

                    return fail(nullError);

                }

            }

            console.log("End: dynamodbController");

        }
        catch (err)
        {
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

        return response;

    }
}