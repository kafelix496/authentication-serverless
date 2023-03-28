export const usersTableIAM = {
  Effect: 'Allow',
  Action: [
    'dynamodb:PutItem',
    'dynamodb:GetItem',
    'dynamodb:UpdateItem',
    'dynamodb:Query'
  ],
  Resource: ['${self:custom.usersTable.arn}']
}
