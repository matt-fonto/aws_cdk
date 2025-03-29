# AWS Services

![3-tier-architecture](image.png)

### DNS: Route53

- Define DNS configuration
- Where you route traffic to
- Supports health-checking
- Defines externally facing apis/endpoints

### Load Balancer: Elastic Load Balancer

- Distributes traffic
- There are different strategies, either through the HTTP header or through the network layer

### Web Backend Layer: EC2 (Elastic Compute Cloud)

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

### Application Layer

- Same fundamental building blocks as the backend layer (EC2, Lambda, ECS)

### API Gateway

- API throtlling
- Authorization
- Validates tokens
- Model validation for API requests

### User Pools (Cognito)

- Create user pools, meaning you can route users through it to create their profile
- Very useful for applications that require user registration

### Database

- Elastic Cache
  - Demands some infra node management
- Relational Database:
  - Aurora: in-house AWS db compatible with Postgres and MySQL
    - A bit more of "hands-off" db
    - What lambda did for EC2, Aurora does for RDS
  - RDS: Selects the db config you want
- NoSQL Database
  - DynamoDB: fully managed db
  - DocumentDB: Similar to MongoDB
  - OpenSearch: perform more complex queries and grouping
