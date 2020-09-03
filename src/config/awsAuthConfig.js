import AWS from "aws-sdk";

const awsAuthConfig = {
  Auth: {
    region: "eu-west-1",
    userPoolId: "eu-west-1_9lAjKfcMK",
    userPoolWebClientId: "7vpkp051ch7j5jqi3iv64mh46g"
  },
  API: {
    endpoints: [
      {
        name: "Cognito",
        endpoint: "https://cognito-idp.eu-west-1.amazonaws.com/",
        service: "cognito",
        region: "eu-west-1"
      }
    ]
  }
};

AWS.config.update({
  region: "eu-west-1",
  accessKeyId: "AKIARY5FGMJLXJ63PUOH",
  secretAccessKey: "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"
});

export { awsAuthConfig };
