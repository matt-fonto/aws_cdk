# AWS CDK

What is CDK?

- Creating stuff on AWS console isn't the most practical and scalable way of setting up your infra
- Allows the creation of software architecture through code itself
- It has native and long-term support for AWS architecture. It's created by AWS itself

Example

```ts
// dynamo db table
const table = new TableV2(this, "MyTable", {
  partitionKey: { name: "myPrimaryKey", type: AttributeType.STRING },
  sortKey: { name: "mySortKey", type: AttributeType.NUMBER },
});

const bucket = new Bucket(this, "MyBucket", {
  versioned: true,
});

const lambdaFunction = new Function(this, "MyLambdaFunction", {
  runtime: Runtime.NODEJS_20_X,
  handler: "index.handler",
  code: Code.fromAsset("../lambda"),
});

// utility and helper methods
table.grantReadWriteData(lambdaFunction);
bucket.grantReadWrite(lambdaFunction);
```
