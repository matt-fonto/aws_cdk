# Main Cloud Services

## Summary

1. Compute: Run applications (e.g., VMS, containers, serverless)
2. Storage: Store files, objects, backups, databases
3. Networking: Manage traffic, VPNs, load balancers, CDNs
4. Databases: Managed SQL/NoSQL services
5. DevOps & CI/CD: Pipelines, monitoring, deployment
6. AI/ML: Tools and APIs for machine learning, NLP, vision
7. Security: IAM, encryption, firewalls, compliance
8. Analytics: Big data processing, ETL, BI tools

| Service Type | AWS                       |
| ------------ | ------------------------- |
| Compute      | EC2, Lambda, EKS          |
| Storage      | S3, EBS, Glacier          |
| Networking   | VPC, Route 53, CloudFront |
| Database     | RDS, DynamoDB, Aurora     |
| DevOps       | CodePipeline, CodeBuild   |
| AI/ML        | SageMaker, Rekognition    |
| Security     | IAM, KMS, Shield          |
| Analytics    | Redshift, Athena, Glue    |

## 1. Compute | VM (EC2)

- CPU, RAM, Disk Space
- You get a computer
- Every type of cloud service is basically this
- EC2 (AWS), Compute Engine (Google Cloud), etc
- Unmanaged: the cloud provider simply offers you the service

## 2. Storage | Object store (S3)

- It's basically an abstraction of VM with the possibility of Read/Write files
- You don't worry about where they are and how the files are managed
- You don't need to do anything to scale read/write
- Managed service: cloud provider manages the infrastructure required for you
  - It's abstracted away from you

## 3. Database (RDS/DynamoDB)

- Managed solution for storing database
- Nobody wants to host their database, we want that abstracted away
- AWS takes open-source software (MySQL, Postgres) and hosts it (make a managed service out of it), providing ease-of-use
- DynamoDB: proprietary database. Difficult to migrate (vendor lock-in)
- Postgres: non-proprietary database. Easier to migrate

## 4. FaaS (Function as a Service) (Lambda)

- Code is pretty much deployed
- No worries with the environment where the code runs
- Ideal for APIs, webhooks, automation, lightweight backend logic
- When running Lambdas we have access to compute (CPU), but no disk

### 4.1 Concept

- FaaS allows code to run in response to events without managing servers

#### What it does

- Runs function on demand
- Scales automatically
- Triggers from HTTP requests, S3 uploads, database changes, etc

#### What it abstracts

- Server provisioning and scaling (no EC2 setup)
- OS management (patching, updating)
- Concurrency handling
- Load balancing
- Idle cost (pay-per-invocation)
