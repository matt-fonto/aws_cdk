# AWS CDK

## 1. What is CDK?

- Creating stuff on AWS console isn't the most practical and scalable way of setting up your infra
- Allows the creation of software architecture through code itself
- It has native and long-term support for AWS architecture. It's created by AWS itself
- Speed, version-control, maintainability of architecture

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

## 2. CDK vs. CloudFormation

| Feature         | AWS CDK                                               | CloudFormation                               |
| --------------- | ----------------------------------------------------- | -------------------------------------------- |
| Language        | Real programming languages (TS, Python, etc)          | JSON or YAML                                 |
| Abstraction     | High-level constructs (L2/L3) with defaults and logic | Low-level, declarative                       |
| Maintainability | Easier to manage, test, and scale                     | Becomes verbose and error-prone over time    |
| Learning curve  | Easier for developers                                 | Easier for ops reams familiar with YAML/JSON |

- At the end, CDK compiles to CloudFormation and the generated CloudFormation template is what is uploaded to AWS
- CDK -> compiled to CloudFormation -> this file -> sent to AWS

## 3. CDK CLI commands

- Most important CDK CLI commands

```bash
# Project and Synthesis
cdk init app --language=typescript # create new CDK project
cdk synth # generate cloud formation template from code

# Deploy and Manage
cdk deploy # deploy stack
cdk diff # show changes between deployed and local verion
cdk destroy # delete deployed stack

# Utilities
cdk list # list all stacks in the app
cdk doctor # diagnose environment issues
cdk bootstrap # setup s3 buckets and roles for asset deployment (must run once per env)
```
