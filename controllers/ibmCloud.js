const AWS = require("ibm-cos-sdk");
const { jsonToCsv, cleanCsv } = require("../utils/jsonToCsv");
var config = {
  endpoint: "s3.eu-de.cloud-object-storage.appdomain.cloud",
  apiKeyId: "fViia0EVJE9rWLKcb7xVR-IIQ7knIPY8IKflOw2OceSW",
  ibmAuthEndpoint: "https://iam.cloud.ibm.com/identity/token",
  serviceInstanceId:
    "crn:v1:bluemix:public:cloud-object-storage:global:a/2bb22612df3841959024ce84579a702e:f51e2514-d76b-40c9-acde-3a8528febf40::",
};
var cos = new AWS.S3(config);

exports.createIbmCloudData = (req, res, next) => {
  //   console.log("coucou");
  const itemName = "TEST";
  //   console.log(`Creating new item: ${itemName}`);
  const allItems = res.locals.allResults;
  //   console.log(req.body.result);s
  const obj = req.body.response;
  //   console.log(req.body.result);
  let test = [];
  let result = Object.entries(req.body.result)
    .map((value, index) => [...test, { id: value[0], response: value[1] }])
    .flat();

  const csv = jsonToCsv({
    allItems: allItems,
    items: [...obj, ...result],
    userId: req.auth.userId,
  });
  //   const csvClean = cleanCsv(csv);
  //   console.log(csvClean);
  //   return cos
  //     .putObject({
  //       Bucket: "clous-storage-carbonb-cos-standard-26b",
  //       Key: "listOfQuestions.csv",
  //       Body: csv,
  //     })
  //     .promise()
  //     .then(() => {
  //       console.log(`Item: ${itemName} created!`);
  //     })
  //     .catch((e) => {
  //       console.error(`ERROR: ${e.code} - ${e.message}\n`);
  //     });

  //   console.log(
  //     `Retrieving item from bucket: "clous-storage-carbonb-cos-standard-26b", key: ${req.itemName}`
  //   );
  //   return cos
  //     .getObject({
  //       Bucket: "clous-storage-carbonb-cos-standard-26b",
  //       Key: "listOfQuestions.csv",
  //     })
  //     .promise()
  //     .then((data) => {
  //       if (data != null) {
  //         console.log("File Contents: " + Buffer.from(data.Body).toString());
  //         res.status(201).json(Buffer.from(data.Body).toString());
  //       }
  //     })
  //     .catch((e) => {
  //       console.error(`ERROR: ${e.code} - ${e.message}\n`);
  //     });
};
