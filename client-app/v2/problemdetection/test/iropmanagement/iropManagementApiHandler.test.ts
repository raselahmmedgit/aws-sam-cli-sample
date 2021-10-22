import awsMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { timeStamp } from 'console';

awsMock.setSDKInstance(AWS);

describe('Positive test cases', function ()  {
    let testvar="Hello World";
    console.log("Basic test running");
    test('addition of 2 numbers', async () => {
        expect(5 + 3).toBe(8);
        expect(testvar).toBe("Hello World"); 
      });
});
