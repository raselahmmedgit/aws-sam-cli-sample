var { currentDateTime } = require("./module");
var { success, error } = require("./helper/message-helper");
var { info, warning, ok, fail } = require("./model/result-model");
var { dynamodbController } = require("./controller/dynamodb-controller");

let response;

exports.lambdaHandler = async (event, context) => {
    try {
		
        console.log("Start: app - lambdaHandler");

        const paramObj = JSON.parse(event.body);
        const controllername = paramObj.controllername;

        if (paramObj === null || typeof paramObj === undefined) {
            return fail(nullError);
        }
        else {

            switch (controllername) {
                case "DynamoDb":
                    console.log("Start: app - DynamoDb Controller");

                    var result = await dynamodbController(paramObj);

                    response = {
                        statusCode: 200,
                        body: JSON.stringify(result)
                    };

                    break;
                default:
                    console.log("Start: app - default");

                    var description = ("Current Date Time: " + currentDateTime);
                    response = {
                        statusCode: 200,
                        body: JSON.stringify({
                            success: true,
                            message: "hello world!",
                            description: description
                        }),
                    };

                    break;
            }

        }

        

        console.log("End: app - lambdaHandler");
		
    } catch (err) {
        console.log("Error: " + err);
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
