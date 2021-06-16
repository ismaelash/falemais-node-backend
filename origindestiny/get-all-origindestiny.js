var AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1"
});
var docClient = new AWS.DynamoDB.DocumentClient();


module.exports.handler = async (event) => {
    var params = {
        TableName: "vortx-origindestiny"
    };

    const promise = new Promise(function(resolve, reject) {
        docClient.scan(params, function(err, data) {
            if (err) {
                reject(Error(err));
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                resolve(data.Items);
                console.log("Items:", JSON.stringify(data.Items, null, 2));
            }
        });
    })
        
   return promise;
}