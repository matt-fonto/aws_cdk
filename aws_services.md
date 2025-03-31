# AWS Services

![3-tier-architecture](image.png)

- Many AWS services are abstractions over open-source software

## 1. Individual Services

### 1.1. DNS: Route53

- Define DNS configuration
- Where you route traffic to
- Supports health-checking
- Defines externally facing apis/endpoints

### 1.2. Load Balancer: Elastic Load Balancer

- Distributes traffic
- There are different strategies, either through the HTTP header or through the network layer
- Similar to: NGINX, Traefik

### 1.3. Web Backend Layer: EC2 (Elastic Compute Cloud)

- EC2: Rent VMs for the hour
  - Pros:
    - Really flexible service
    - Host anything, from Wordpress to Backend
  - Cons:
    - Setup and config
    - Might not be the most cost-effective solution
- Lambda: Serverless compute infrastructure
  - Define functions that run on triggers
  - Abstract infrastructure
  - Pay-per-invocation
  - Really popular service
- ECS: Elastic Container Service
  - Used for Docker/containers
  - Helps manage containers
  - Something in the middle between EC2 and Lambda
  - Similar to: Docker + Docker Compose, Kubernetes

### 1.4. Application Layer

- Same fundamental building blocks as the backend layer (EC2, Lambda, ECS)

### 1.5. API Gateway

- API throtlling
- Authorization
- Validates tokens
- Model validation for API requests
- Similar to: Express.js middlewares

### 1.6. User Pools (Cognito)

- Create user pools, meaning you can route users through it to create their profile
- Very useful for applications that require user registration
- Similar to: Auth0, Firebase Auth, Supabase Auth

### 1.7. Database

- Elastic Cache
  - Demands some infra node management
- Relational Database:
  - Aurora: in-house AWS db compatible with Postgres and MySQL
    - A bit more of "hands-off" db
    - What lambda did for EC2, Aurora does for RDS
  - RDS: Selects the db config you want
    - Similar to: PostgresSQL, MySQL
- NoSQL Database
  - DynamoDB: fully managed db
  - DocumentDB: Similar to MongoDB
  - OpenSearch: perform more complex queries and grouping

### 1.8. Cache (CloudFront)

- CDN: Content Delivery Network
- Caches and serves your content from edge locations closer to users, reducing latency and speeding up delivery
- Delivers static & dynamic content faster
- Reduces load on origin server (e.g., S3, EC2, API Gateway)

### 1.9. Deployment

Code commit, build, deploy, pipeline

#### 1.9.1. Code Commit

- Save your source code
- Similar to: GitHub

#### 1.9.2. Code Build

- Useful to build CI/CD pipelines
- Build and testing the code
- Similar to: GitHub actions

#### 1.9.3. Code Deploy

- Takes the artifacts from code commit and code build and deploys it

#### 1.9.4. Code Pipeline

- Deployment orchestration service

### 1.9. Monitoring (CloudWatch | CloudTrail)

- CloudWatch: Evaluate metrics on AWS metrics

  - CPU usage, memory usage, lambda invocations, etc
  - Similar to: Prometheus, Grafana

- You need to keep checking whether the software is up and running as expected
- Logging

- CloudTrail: Audit of operations that are being performed

  - Who is performing what
  - Who's accessing different services

### 1.10. Security (IAM - Identity and Access Management)

- Creation of users and roles and their permission
- Deny everything unless someone allows it

### 1.11. Rapid Deployment (CloudFormation | CDK)

- Infrastructure as code (IaC)
- Infrastructure is written through code
- CloudFormation: YAML, JSON config files that provisions infra
  - Similar to: Terraform
- CDK: Use a programming language to build the infra, which will be converted to CloudFormation

### 1.12. Rapid Development (Amplify | SAM)

- Amplify: Like Vercel + Firebase
  - Rapid deployment of full-stack apps
  - User authentication + authorization
  - Functions on functionality
  - Abstraction of the services
  - Well-defined box
    - If you prefer to stay in a very-well delineated box, Amplify might be the solution. Otherwise, writing your own CDK does the work
- SAM: Serverless application model

  - Provides common cloud infra patterns
  - Provides some patterns, similar to high-level (L3) CDK constructs

### 1.13. Service Notification | Event Coordination (SNS | SQS | EventBridge | Step Function)

- SNS: Publishes notifications to a topic that can have multiple subscribers
  - We can have publishers + subscribers (lambda, http endpoint, SQS)
  - Similar to: Kakfa
  - Tell other about data or data changes
- SQS: Simple Queue Service
  - Holds messages to process them after
  - Similar to: Event-loop JS
  - Notifies when something changes in some service data
- EventBridge: Similar to SNS
  - Delivers information based on triggers
  - If X happens, deliver to Y
- Step Function: Defines workflow
  - Build some step-by-step flow
  - Orchestration flows that run through steps

### 1.14. General Object Storage | Blob storage (S3 - Simple Storage Service)

- Similar to BLOB storage
- Allows storing massive amounts of data very cheaply
- Can store any type of media

### 1.15. Analytical Processing (EMR | Athena)

- EMR: Large scale distributed data-processing
- Athena: Serveless big-data analysis
  - Athena can crawl S3, automatically detect its schema, and creates tables, which can be queried
  - Run queries on data storaged on S3

### 1.16. Data Warehouse (Redshift)

- Redshift: good for interacting with data at scale

### 1.17. Dashboard (QuickSight)

- QuickSight: PowerBI, used for generating graphs and visuals based on the data

### 1.18 Network Boundary (VPC - Virtual Private Cloud)

- Isolated network
- Private networking spaces for services

## 2. Packaged Services (PaaS - Platform-as-a-Service)

- They offer a combination of individual services

### 2.1 Elastic Beanstalk

- Packages multiple AWS services and lets you deploy and run web apps without managing infrastructure
- Like Vercel

#### 2.1.1 It offers

- Automatic provisioning of:
  - EC2
  - Load balancer
  - Auto scaling
  - RDS
  - CloudWatch
- Built-in deployment pipeline
- Environment management (dev, staging, prod)
- Supports multiple languages
- Zero-downtime deployments with rolling updates

| Feature       | Elastic Beanstalk                | Heroku                 | Vercel                      |
| ------------- | -------------------------------- | ---------------------- | --------------------------- |
| Infra control | Medium (AWS resources visible)   | Low (fully abstracted) | Very low (frontend-focused) |
| Focus         | Full-stack apps, backend heavy   | General web apps       | Frontend, edge/serverless   |
| Customization | High (we can tweak the services) | Low                    | Low                         |
| Pricing model | Pay-per-AWS resource             | Pay-per-dyno           | Pay-per function/storage    |
| Ease of use   | Moderate                         | Very easy              | Extremely easy              |

### 2.2. App Runner

- Fully managed PaaS for containerized web apps
- Just point to your repo/container image -> AWS builds & runs it
- Auto-scaling, HTTPS, load balancing, no infra config
- Closer to Vercel/Heroku, but with container support

### 2.3. Lightsail

- Simplified PaaS for small apps or quick prototypes
- Bundled pricing (VM, storage, networking)
- Offers pre-configured stacks (WordPress, LAMP, etc)
- Like a beginner-friendly verson of EC2 with PaaS flavor
- Good for simple applications, such as a blog
- Similar to GoDaddy, etc

### 2.4. Lambda + API Gateway

- Together act as a PaaS for serverless apps/APIs
- Fully abstracted runtime + autoscaling + event-driven triggers

### 2.5. Fargate

- Serverless containers
- Run Docker containers withotu managing EC2 instances
- More control than App Runner, still abstracts server provisioning
