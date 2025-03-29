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

### 1.1 Step by step

#### 1.1.1. One-person setup

1. Write CDK code
2. `cdk deploy`
3. CloudFormation Template
4. CloudFormation Deployment

#### 1.1.2. Teams

Automated deployments

- The same step as above, but between step 1 and 2, there is a PR openning + Github CI/CD

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
cdk help # list of all commands
cdk list # list all stacks in the app
cdk doctor # diagnose environment issues
cdk bootstrap # setup s3 buckets and roles for asset deployment (must run once per env)

# Auth profiles
cdk context # view/set cached context values
cdk --profile myprofile # run cdk with a specific aws profile
```

## 4. Constructs

- It's a building-block in AWS
- It can represent a single or multiple AWS resources
- All CDK code is a tree of constructs
- Example: `Bucket`, `Function`, Vpc`, custom classes, etc
- Nice resource: https://constructs.dev/
- Docs: https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html

Abstraction level (from lower to higher):
L1 -> L2 -> L3

### 4.1 Level 1 (L1): CFN (CloudFormation) Resources

- Direct 1:1 mapping with CloudFormation(`Cfn*`)
- Full control, no validation or convenience
- Very verbose

```ts
new s3.CfnBucket(this, "MyBucket", {
  versioningConfiguration: { status: "Enabled" },
});
```

Use when:

- No L2 exists yet
- Need of rarely-used property

### 4.2 Level 2 (L2): AWS Resources

- Abstract L1 with sane defaults and validations
- Idiomatic, easier to use
- Applies to a single resource
- Medium abstraction
- Security best practices
- Helper methods
- Most commonly used

```ts
new s3.Bucket(this, "MyBucket", {
  versioned: true,
});
```

Use L2 by default -- it's safer, readable, and upgradable

### 4.3 Level 3 (L3): Construct compositions

- Opinionated, reusable combos of L2s
- Speeds up development for common patterns
- Defines a large infra piece
- Use for well-established patterns

```ts
new apigateway.LambdaRestApi(this, "MyApi", {
  handler: myLambda,
});
```

Use for productivity and fast infra scaffolding

## 5. Stacks

- Unit of deployment
- Collection of AWS resources defined as a single unit
- Created, updated, or deleted together
- Maps to a CloudFormation stack
- A way to organize resources

```ts
new MyStack(app, "MyStack", { env: { region: "us-east-1" } });
```

### 5.1 Best practices

- One responsibility per stack (e.g., NetworkStack, AppStack)
- Keep stack small and modular

### 5.2 Stacks & Microservices

- Stacks are typically used to organize microservices
- Separation of concerns (each service = one stack)
- Independent deployments
- Cross-stack references if services need to talk
- Works well with CI/CD, feature flags, and staging setups

```ts
Example:

ServiceAStack -> Lambda + API + DB
ServiceBStack -> Same, isolated
SharedInfraStack -> VPC, S3, etc., imported by others
```

## 6. App

What is a CDK App?

- The root construct, the entry point of your CDK project
- Where you define and group stacks
- Represented by `new cdk.App()` in the code
- When we run `cdk synth`, the app synthesizes all its stacks into CloudFormation templates
- The container that holds and manages your infra units (Stacks)

```ts
const app = new cdk.App();

new AuthStack(app, "AuthStack");
new ApiStack(app, "ApiStack");
new FrontendStack(app, "FrontendStack");
```

- We can have only one App per project, as many stacks per app, and as many contructs per stack

```js
App/
  /stack1
    construct1
    construct2
    contruct3
  /stack2
    construct1
    construct2
    contruct3
```

## 7. Step by step

### 7.1 Security

For daily operations and automations, never user the AWS root user. Instead, create/use an IAM User or Role instead

- Create an IAM user with least-privilege permissions

### 7.2 Installation AWS CLI and CDK

```bash
# we need node js and typescript installed
# npm -g install typescript

brew install awscli # install aws cli
aws --version # check version

npm install -g aws-cdk # install aws cdk cli
cdk --version
```

### 7.3 Configuration

```bash
aws configure

# access key
# secret access key
# default region name: eu-central-1
# default output format: json

aws sts get-caller-identity
```

### 7.4 Getting started

```bash
cdk init app --language typescript
```

- By using the CDK, we can write unit tests to ensure it's working as expected

#### 7.4.1 Folder structure

```
my-cdk-app/
├── bin/
│   └── my-cdk-app.ts        # Entry point (instantiates the CDK app and stacks)
├── lib/
│   └── my-cdk-app-stack.ts  # Defines your infrastructure (resources)
├── test/
│   └── my-cdk-app.test.ts   # Jest tests for your stack
├── cdk.json                 # CDK CLI config (specifies app entry point)
├── package.json             # Node project config
├── tsconfig.json            # TypeScript config
├── jest.config.js           # Test config
└── .gitignore
```

- bin: main file to instantiate app and stacks | Main config
- lib: actual CDK constructs and stack definitions | Infra Logic
- cdk.json: Entry for CDK CLI to know what to run on `cdk synth`, etc
- package.json: manages CDK packages and deps

## 8. IaC (Infrastructure as Code) generator

- Go to CloudFormation/IaC generator
- You will have a CloudFormation file based on your infra

```bash
cdk migrate --stack-name <stack-name> --language <language> --from-path <path>
```

- It allows us to migrate from manually created architecture to CDK
- It migrates to L1 constructs, not L2
