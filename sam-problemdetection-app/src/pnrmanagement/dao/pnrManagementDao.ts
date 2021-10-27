import { pnrModel } from '../model/pnrModel';
const AWS = require("aws-sdk");
AWS.config.update({
    region: "local",
    endpoint: "http://host.docker.internal:8000"
});

export class pnrManagementDao {
    docClient: any;
    tableName = "pnrInfo";

    constructor() {
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    async insertPnrObject(pnrModel: pnrModel) {
        let result = false;
        try {

            var params = {
                TableName: this.tableName,
                Item: {
                    "id": pnrModel.Id,
                    "name": pnrModel.Name,
                    "pnrCode": pnrModel.PnrCode
                }
            };
            console.log("pnrManagementDao - insertPnrObject", pnrModel);
            await this.docClient.put(params, async function (err, data) {
                if (err) {
                    result = false;
                } else {
                    result = true;
                }
            }).promise();
        } catch (err) {
            result = false;
        }
        return result;
    }

    async getPnrObject(id: Number) {
        let pnrCode: string;
        try {
            const params = {
                TableName: this.tableName,
                Key: {
                    "id": id
                }
            };
            console.log("pnrManagementService - getPnrObject", pnrCode);
            await this.docClient.get(params, async function (err, data) {
                if (err) {
                    pnrCode = null;
                }
                else {
                    pnrCode = data.Item.pnrCode;
                }
            }).promise();

        } catch (err) {
            pnrCode = null;
        }
        return pnrCode;
    }

    async createTableIfNotExist() {
        let dynamodb = new AWS.DynamoDB();
        const tablePromise = await dynamodb.listTables({})
            .promise()
            .then(async (data) => {
                const exists = data.TableNames
                    .filter(name => {
                        return name === this.tableName;
                    })
                    .length > 0;
                if (exists) {
                    return Promise.resolve();
                }
                else {
                    const params = {
                        TableName: this.tableName,
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
                        // more params
                    };
                    return await dynamodb.createTable(params).promise();
                }
            });
    }

}