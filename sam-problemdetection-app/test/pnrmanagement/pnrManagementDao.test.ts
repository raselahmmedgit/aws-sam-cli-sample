import awsMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
//changed this from aws-sam build folder
import { pnrManagementDao } from '../../src/pnrmanagement/dao/pnrManagementDao';
import { pnrModel } from '../../src/pnrmanagement/model/pnrModel';

awsMock.setSDKInstance(AWS);

test('pnrManagementDao Insert Test', async function () {
    const pnrDao = new pnrManagementDao();
    await pnrDao.createTableIfNotExist();

    let pnr = new pnrModel();
    pnr.Id = 1;
    pnr.Name = "Test Name";
    pnr.PnrCode = "123456"
    let isSuccess = await pnrDao.insertPnrObject(pnr);
    expect(isSuccess).toBeTruthy();
});

test('pnrManagementDao Get Test', async function () {
    const pnrDao = new pnrManagementDao();
    let pnrCode = await pnrDao.getPnrObject(1);
    expect(pnrCode).not.toBeNull();
    expect(pnrCode).toBe("123456");
});