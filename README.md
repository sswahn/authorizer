# Authorizer
An AWS Cognito authorizer for APIGateway that uses **HTTP Cookies**.

## Overview

Designed for use with AWS Lambda as a custom authorizer for AWS API Gateway to authenticate and authorize users against an AWS Cognito User Pool.

## Requirements

Before deploying, make sure to configure the following:

1. **AWS Cognito User Pool**: Set up an AWS Cognito User Pool and configure it with appropriate security settings.

2. **AWS API Gateway**: Create an AWS API Gateway and configure the Lambda authorizer to use the Lambda function implementing this authorizer.

3. **IAM Permissions**: Ensure that the IAM role associated with this Lambda function has the necessary permissions to interact with AWS Cognito. Specifically, the Lambda function should have permissions to execute the `GetUserCommand` and any other relevant AWS SDK operations. Sample IAM policy:

```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "cognito-idp:GetUser",
         ],
         "Resource": [
           "arn:aws:cognito-idp:YOUR_REGION:YOUR_ACCOUNT_ID:userpool/YOUR_USER_POOL_ID"
         ]
       }
     ]
   }
```
## Usage  

```javascript
import { authorizer } from '@sswahn/authorizer'

export const handler = async (event, context, callback) => {
  authorizer('cookieName', event, callback)
}
```

## License
Authorizer is [MIT Licensed](https://github.com/sswahn/authorizer/blob/main/LICENSE)
