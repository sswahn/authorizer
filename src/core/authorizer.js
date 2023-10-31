import { CognitoIdentityProviderClient, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider'

export const secureCognitoAuthorizer = async (event, callback) => {
  try {
    if (!event.headers.Cookie || !event.headers.Cookie.includes('id=')) {
      callback('Unauthorized')
    }
    const token = event.headers.Cookie.split('id=')[1].split(';')[0]
    const client = new CognitoIdentityProviderClient()
    const command = new GetUserCommand({ AccessToken: token })
    await client.send(command)
    callback(null, {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [      {
          Action: 'execute-api:Invoke',
          Effect: 'Allow',
          Resource: event.methodArn
        }]
      }
    })
  } catch (error) {
    callback('Unauthorized')
  }
}
