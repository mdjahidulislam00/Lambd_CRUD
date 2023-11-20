const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-north-1" });
const uuid = require("uuid");

const DynamoDBInsertOperation = async () => {
    const id = uuid.v1();

    const phoneToCheck = '01435245634';

    const params = {
        TableName: process.env.API_LIKERBACKENDGRAPHQLMAINSLA_AUTOEVENTTABLE_NAME ? process.env.API_LIKERBACKENDGRAPHQLMAINSLA_AUTOEVENTTABLE_NAME : "OnlineShopUser",
        Item: {
            id: id,
            name: "milon",
            gender: "male",
            phone: phoneToCheck,
            age: 20
        },
        FilterExpression: "phone = :phone",
        ConditionExpression: "attribute_not_exists(phone)",
        ExpressionAttributeValues: {
            ":phone": phoneToCheck
        },
    };

    try {
        if (data = await docClient.query(params).promise())
            const data = await docClient.put(params).promise();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        // Check if the error code is due to conditional check failure (phone already exists)
        if (error.code === 'ConditionalCheckFailedException') {
            console.log('Phone number already exists.');
            // Handle the case where the phone number is not unique
        }
    }
};

// Call the insert operation
(async () => {
    const response = await DynamoDBInsertOperation();
    console.log(response);
})();
