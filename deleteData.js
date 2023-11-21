const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-north-1" });

const DynamoDBDeleteData = async () => {
    const params = {
        TableName: 'OnlineShopUser',
        Key: {
            id: "03bee470-882a-11ee-87f2-b57f58619c0a"
        }
    };

    try {
        const data = await docClient.delete(params).promise();

        console.log('sucessfully deleted item');
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
    const response = await DynamoDBDeleteData();
    console.log(response);
})();
