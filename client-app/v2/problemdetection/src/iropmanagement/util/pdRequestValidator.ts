export function pdRequestValidator(event: any) {
    var validated: boolean = false;
    var recordLocater: string = event.pathParameters.pnr;
    var agentId: string = event.pathParameters.agentId;
    var agentDutyCode: string = event.pathParameters.agentDutyCode;
    var appName: string = event.pathParameters.applicationName;
    var webAppADAuthGroup: string = event.pathParameters.webappADAuthGroup;

    validated = validateRecordLocater(recordLocater);
    if (validated) {
        if ((appName === "AXIS") || (appName === "RMEWEBAPP")) {
            validated = validateAgents(agentId, agentDutyCode);
            console.log("agents validation is successful :-" + (validated));
        }
        if (appName === "RMEWEBAPP") {
            validated = validateAuthGroup(webAppADAuthGroup);
            console.log("WebAuthGroup validation is successful :-" + (validated));
        }
    }
    return validated;
}


function validateRecordLocater(pnr: string) {
    var valid: boolean = false;
    var pattern: RegExp = /^([a-zA-Z0-9]{6})$/;
    return pattern.test(pnr);
}

function validateAgents(agentId: string, agentDutyCode: string) {
    var valid: boolean = false;
    var pattern: RegExp = /^([0-9]{6})$/
    //agentDutyCode validation TBD. Need to get the list of valid agentDutyCode.
    return pattern.test(agentId);
}

function validateAuthGroup(authGroup: string) {
    var valid: boolean = false;
    var pattern: RegExp = /^([a-zA-Z]+)$/;
    return pattern.test(authGroup);
}