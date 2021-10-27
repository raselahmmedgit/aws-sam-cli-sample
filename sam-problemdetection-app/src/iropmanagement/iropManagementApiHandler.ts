import { Context, Callback } from "aws-lambda";
import { AxiosResponse } from "axios";
import { pdRequestValidator } from "./util/pdRequestValidator";

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
const stepFunctions = new AWS.StepFunctions({ apiVersion: "2016-11-23" });
let response;

exports.lambdaHandler = function (event: any,context: Context,callback: Callback) {
  let array = event.path.split("/");

  switch (array[1]) {
    case "health":
      response = {
        statusCode: 200,
        body: JSON.stringify({ statusCode: "pass" }),
      };
      callback(null, response);
      break;
    case "v1":
      if (pdRequestValidator(event)) {
        //Validation successful, now invoke the step function.
        /*
                const params = {
                    stateMachineArn: process.env.TriggerParallelStateMachineARN,
                };
                processStepfunctionResponseStructure(params, function (err: any, data: any) {
                    callback(err, data)
                })
                */
        console.log("PD Request validation successful");
        response = {
          statusCode: 200,
          body: JSON.stringify({
            message: "Hello this is PD Response",
            // location: ret.data.trim()
          }),
        };
        callback(null, response);
      } else {
        //send a response saying bad request
        console.log("in else block");
        response = {
          statusCode: 400,
          body: JSON.stringify({
            message: "Bad Request | Invalid Input Value - Payload",
            // location: ret.data.trim()
          }),
        };
        callback(null, response);
      }
      break;
    default:
      callback(null, {
        statusCode: 400,
        body: JSON.stringify("bad path params provided"),
      });
      break;
  }
};

function triggerSyncStepFunction(params) {
  return stepFunctions.startSyncExecution(params).promise();
}

function processStepfunctionResponseStructure(params: any, callback: any) {
  triggerSyncStepFunction(params).then(
    (data) => {
      let responseBody = "";
      responseBody = data.output;
      // mockData.retrieveProfileResponse.profileResponse.customer['@id'] = JSON.parse(params.input).passengerId;
      // responseBody = JSON.stringify(mockData); // As soa2api endpoints become available, mock data will be replaced with live data
      const response = {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: responseBody,
      };
      callback(null, response);
    },
    (err) => {
      console.log("error object in step function trigger response", err);
      const response = {
        statusCode: 500,
        headers: {
          "Content-Type": "application/json",
        },
        body: "There was an error",
      };
      callback(null, response);
    }
  );
}
