var moduleDateTime = require('./module');
let response;

exports.lambdaHandler = async (event, context) => {
    try {
		
        console.log('Start: hello - lambdaHandler');

        var content = ('Current Date Time: ' + moduleDateTime.currentDateTime());
        response = {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world!',
                content: content
            }),
        };

        console.log('End: hello - lambdaHandler');
		
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
