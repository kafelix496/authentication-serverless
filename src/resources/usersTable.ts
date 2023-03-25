export const usersTableResource = {
  Type: 'AWS::DynamoDB::Table',
  Properties: {
    TableName: 'users-table-${self:provider.stage}',
    AttributeDefinitions: [
      {
        AttributeName: 'email',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'email',
        KeyType: 'HASH'
      }
    ],
    BillingMode: 'PAY_PER_REQUEST'
  }
}
