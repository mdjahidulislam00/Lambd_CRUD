const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-north-1" });
const uuid = require("uuid");

const DynamoDBInsertOperation = async (args) => {

    const id = uuid.v1();
    const name = 'Shakib khan'
    const gender = 'male'
    const phone = "3455766444"
    const age = "18"

    let data;

    try {
        data = await docClient.query({
            TableName: "OnlineShopUser",
            IndexName: "phone-index",
            KeyConditionExpression: "phone = :existingPhone",
            ExpressionAttributeValues: {
                ":existingPhone": phone,
            },
        }).promise();

    } catch (error) {
        console.log(error)
    }

    if (data?.Items?.length == 0) {
        try {
            const data = await docClient.put({
                TableName: "OnlineShopUser",
                Item: {
                    id: id,
                    name: name,
                    gender: gender,
                    phone: phone,
                    age: age
                },
                ConditionExpression: "id <> :v1",
                ExpressionAttributeValues: {
                    ":v1": id,
                },
            }).promise();

            console.log('inserting data to dynamodb', JSON.stringify(data))
            return {
                id: id,
                name: name,
                gender: gender,
                phone: phone,
                age: age
            };

        } catch (error) {
            console.log(error)
        }
    } else {
        return {
            statusCode: 403,
            body: `${phone} This phone number already Exists`
        }
    }

};

(async () => {
    const response = await DynamoDBInsertOperation()
    console.log(response)
})()