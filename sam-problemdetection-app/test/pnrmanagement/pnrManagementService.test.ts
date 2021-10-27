import awsMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
//import { mocked } from 'ts-jest/utils';
//changed this from aws-sam build folder
import { pnrManagementDao } from '../../src/pnrmanagement/dao/pnrManagementDao';
import { pnrManagementService } from '../../src/pnrmanagement/service/pnrManagementService';
import { pnrModel } from '../../src/pnrmanagement/model/pnrModel';

awsMock.setSDKInstance(AWS);

test('pnrManagementService - getPnrObject Test: ', async () => {
    try {

        jest.mock('../../src/pnrmanagement/dao/pnrManagementDao', () => {
            return {
                pnrManagementDao: jest.fn().mockImplementation(() => {
                    return {
                        getPnrObject: (id: number) => {
                            return "987654";
                        },
                    };
                })
            };
        });

        const pnrService = new pnrManagementService();
        let pnrCode = await pnrService.getPnrObject(1);
        expect(pnrCode).not.toBeNull();
        expect(pnrCode).toBe("123456");

    } catch (e) {
        console.log(e);
    }
});

test('pnrManagementService - insertPnrObject Test: ', async function () {
    try {

        jest.mock('../../src/pnrmanagement/dao/pnrManagementDao', () => {
            return {
                pnrManagementDao: jest.fn().mockImplementation(() => {
                    return {
                        insertPnrObject: (pnrModel: pnrModel) => {
                            return true;
                        },
                    };
                })
            };
        });

        const pnrService = new pnrManagementService();
        let pnr = new pnrModel();
        pnr.Id = 2;
        pnr.Name = "Zubayed";
        pnr.PnrCode = "456789"
        let isSuccess = await pnrService.insertPnrObject(pnr);
        expect(isSuccess).toBeTruthy();

    } catch (e) {
        console.log(e);
    }
});
