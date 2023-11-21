const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-north-1" });

const DynamoDBGetData = async () => {
    const filterByAge = "18"
    const params = {
        TableName: 'OnlineShopUser',
        FilterExpression: "age >= :a1",
        ExpressionAttributeValues: {
            ":a1": filterByAge
        }
    };

    try {
        const data = await docClient.scan(params).promise();

        console.log('Dynamodb Match Items:' + data.Items);
        return data;
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify('Error fetching data from DynamoDB')
        };
    }
};

(async () => {
    const response = await DynamoDBGetData();
    console.log(response);
})();
