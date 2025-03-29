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
