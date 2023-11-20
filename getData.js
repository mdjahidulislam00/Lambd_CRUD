const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-north-1" });

const DynamoDBGetData = async () => {
    const params = {
        TableName: 'OnlineShopUser',
        Key: {
            id: '001'
        }
    };

    try {
        const data = await dynamoDB.get(params).promise();

        console.log('Retrieved Item:', data.Item);
    } catch (error) {
        console.error('Error:', error);

        // Return an error response
        return {
            statusCode: 500,
            body: JSON.stringify('Error fetching data from DynamoDB')
        };
    }
}

(async () => {
    const response = await DynamoDBGetData()
    console.log(response)
})()