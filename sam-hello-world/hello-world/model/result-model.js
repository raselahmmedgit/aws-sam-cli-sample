var { info, messageTypeInfo, warning, messageTypeWarning, error, messageTypeDanger, success, messageTypeSuccess } = require("../helper/message-helper");

module.exports = {
    info: function (message) {
        return {
            success: false,
            message: message ?? info,
            messagetype: messageTypeInfo
        };
    },

    warning: function (message) {
        return {
            success: false,
            message: message ?? warning,
            messagetype: messageTypeWarning
        };
    },

    fail: function (message) {
        return {
            success: false,
            message: message ?? error,
            messagetype: messageTypeDanger
        };
    },

    ok: function (message) {
        return {
            success: true,
            message: message ?? success,
            messagetype: messageTypeSuccess
        };
    },

}