import { pnrModel } from '../model/pnrModel';
import { pnrManagementDao } from '../dao/pnrManagementDao';


export class pnrManagementService {
    tableName = "pnrInfo";
    
    constructor() {
    }

    async insertPnrObject(pnrModel : pnrModel){
        let result = false;
        try {

            if (this.validateModel(pnrModel)) {
                const pnrDao = new pnrManagementDao();
                result = await pnrDao.insertPnrObject(pnrModel);
                console.log("pnrManagementService - insertPnrObject", pnrModel);
            }
            else {
                result = false;
            }

        } catch (err) {
            result = false;
        }
        return result;
    }

    async getPnrObject(id: number) {
        let pnrCode : string;
        try {
            
            if (this.validateId(id)) {
                const pnrDao = new pnrManagementDao();
                pnrCode = await pnrDao.getPnrObject(id);
                console.log("pnrManagementService - getPnrObject", pnrCode);
            }
            else {
                pnrCode = "Id in not valid.";
            }

        } catch (err) {
            pnrCode = null;
        }
        return pnrCode;
    }

    validateId(id: number) {
        if (id.toString().length <= 2) {
            return true;
        }
        else {
            return false;
        }
    }

    validateModel(pnrModel: pnrModel) {
        if (pnrModel === null || typeof pnrModel === undefined) {
            return false;
        }
        else {
            return true;
        }
    }
   
  }