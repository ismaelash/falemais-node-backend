var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1"
});
var docClient = new AWS.DynamoDB.DocumentClient();


module.exports.handler = async (event) => {
    var params = {
        TableName: "vortx-plan",
        Key:{
            id: event.pathParameters.id.toString()
        }
    };

    console.log('id', event.pathParameters.id)
    const promise = new Promise(function(resolve, reject) {
        docClient.delete(params, function(err, data) {
            if (err) {
                reject(Error(err));
                console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                resolve(data);
                console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            }
        });
    })
        
   return promise;
}