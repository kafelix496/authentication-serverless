export const usersTableIAM = {
  Effect: 'Allow',
  Action: [
    'dynamodb:PutItem',
    'dynamodb:GetItem',
    'dynamodb:UpdateItem',
    'dynamodb:Query'
  ],
  Resource: [
    {
      'Fn::GetAtt': ['usersTableResource', 'Arn']
    }
  ]
}
