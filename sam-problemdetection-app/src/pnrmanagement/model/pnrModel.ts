// aws dynamodb create-table --attribute-definitions AttributeName=id,AttributeType=N --table-name pnrInfo --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --region us-east-2 --output json --endpoint-url http://localhost:8000 
// 
// aws dynamodb put-item --table-name pnrInfo --item  '{"id": {"N": "1"}, "name": {"S": "test"}, "pnrCode": {"S": "123456"}}' --endpoint-url http://localhost:8000

export class pnrModel{
    _id : number;
    _name : string ;
    _pnrCode : string;

    public get Id() {
        return this._id;
    }
    public set Id(value) {
        this._id = value;
    }
    public get Name() {
        return this._name;
    }
    public set Name(value) {
        this._name = value;
    }
    public get PnrCode() {
        return this._pnrCode;
    }
    public set PnrCode(value) {
        this._pnrCode = value;
    }
}