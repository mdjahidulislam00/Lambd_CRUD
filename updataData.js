const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-north-1" });

const DynamoDBUpdateData = async () => {
    const newName = 'kamrul';
    const newGender = 'male';
    const params = {
        TableName: 'OnlineShopUser',
        Key: { id: "1fcb1170-882a-11ee-b745-914ba93babe3" },
        UpdateExpression: 'set #name = :updatedName, #gender = :updatedGender',
        ExpressionAttributeNames: { '#name': 'name', '#gender': 'gender' },
        ExpressionAttributeValues: {
            ':updatedName': newName,
            ':updatedGender': newGender,
        },
        ReturnValues: 'ALL_NEW'
    };

    try {
        const data = await docClient.update(params).promise();

        console.log('Successfully updated item:');
        return data.Attributes;
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify('Error updating data in DynamoDB')
        };
    }
};

(async () => {
    const response = await DynamoDBUpdateData();
    console.log(response);
})();
