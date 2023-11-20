
const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-north-1" });
const uuid = require("uuid");




// exports.handler = async (event) => {
//   // TODO implement
//   return await DynamoDBInsertOperation()
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify('Hello from Lambda!'),
//   };
//   return response;
// };

const DynamoDBInsertOperation = async (args) => {

  const id = uuid.v1();
  const name = 'jony'
  const gender = 'male'
  const phone = "12411"
  const age = "32"
  let data;

  try {
    data = await docClient.query({
      TableName: process.env.API_LIKERBACKENDGRAPHQLMAINSLA_AUTOEVENTTABLE_NAME ? process.env.API_LIKERBACKENDGRAPHQLMAINSLA_AUTOEVENTTABLE_NAME : "OnlineShopUser",
      IndexName: "phone-index",
      KeyConditionExpression: "phone = :v1",
      ExpressionAttributeValues: {
        ":v1": phone,
      },
    }).promise();

  } catch (error) {
    console.log(error)
  }

  if (data?.Items?.length == 0) {
    try {
      const data = await docClient.put({
        TableName: process.env.API_LIKERBACKENDGRAPHQLMAINSLA_AUTOEVENTTABLE_NAME ? process.env.API_LIKERBACKENDGRAPHQLMAINSLA_AUTOEVENTTABLE_NAME : "OnlineShopUser",
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
      console.log('put', JSON.stringify(data))
      return {
        id: id,
        name: name,
        gender: gender,
        phone: phone,
        age: agejj
      };

    } catch (error) {
      console.log(error)
    }
  } else {
    return {
      statusCode: 403,
      body: "phone number already exists"
    }
  }

};



// const DynamoDBScanOperation = async (args) => {
//   const result = []
//   let data;

//   const params = {
//     TableName: "jahid_user",
//     FilterExpression: "#amarStatus = :v1",
//     ExpressionAttributeValues: {
//       ":v1": "green",
//     },
//     ExpressionAttributeNames: {
//       "#amarStatus": "status"
//     }
//   };

//   try {


//     do {
//       data = await docClient.scan(params).promise();
//       result.push(...data.Items)
//       params.ExclusiveStartKey = data?.LastEvaluatedKey
//     } while (typeof data?.LastEvaluatedKey !== "undefined");



//     return result;

//   } catch (error) {
//     console.log(error)
//   }

// };

// const DynamoDBIndexOperation = async (args) => {
//   const result = []
//   let data;

//   const params = {
//     TableName: "Post-57gn6p6j3zaenhk6vj7emrilsu-dev",
//     IndexName: "postsByUsername",
//     KeyConditionExpression: "username = :jahid",
//     FilterExpression: "updatedAt = :v1",
//     ExpressionAttributeValues: {
//       ":v1": "2023-11-16T12:58:24.246Z",
//       ":jahid": "158db176-b4ee-4acf-9a75-04906a89fede::jahid"
//     },
//   };

//   try {


//     do {
//       data = await docClient.query(params).promise();
//       result.push(...data.Items)
//       params.ExclusiveStartKey = data?.LastEvaluatedKey
//     } while (typeof data?.LastEvaluatedKey !== "undefined");



//     return result;

//   } catch (error) {
//     console.log(error)
//   }

// };




(async () => {
  const response = await DynamoDBInsertOperation()
  // const response = await DynamoDBScanOperation()
  // const response = await DynamoDBIndexOperation()
  console.log(response)
})()
