import * as cdk from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // L1 construct (low-level)
    const level1S3Bucket = new CfnBucket(this, "MyFirstLevel1ConstructBucket", {
      versioningConfiguration: {
        status: "Enabled",
      },
    });

    // L2 construct (better)
    const level2S3Bucket = new Bucket(this, "MyFirstLevel2ConstructBucket", {
      bucketName: "mstrappazzonl2bucket", // this name needs to be unique
      removalPolicy: cdk.RemovalPolicy.DESTROY, // on the l2, it's set to RETAIN by default. Set to destroy to remove the previous bucket. Use it carefully
      versioned: true,
    });
  }
}
