var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1"
});
var docClient = new AWS.DynamoDB.DocumentClient();


module.exports.handler = async (event) => {
    var params = {
        TableName: "vortx-origindestiny",
        Item: {
            id: event.id,
            origin: event.origin,
            destiny: event.destiny,
            value: event.value,
        }
    };

    const promise = new Promise(function(resolve, reject) {
        docClient.put(params, function(err, data) {
            if (err) {
                reject(Error(err));
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                resolve(params.Item);
                console.log("Added item:", JSON.stringify(params.Item, null, 2));
            }
        });
    })
        
   return promise;
}