export const expiredGatewayResponseResource = {
  Type: 'AWS::ApiGateway::GatewayResponse',
  Properties: {
    ResponseParameters: {
      'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
      'gatewayresponse.header.Access-Control-Allow-Headers': "'*'"
    },
    ResponseType: 'EXPIRED_TOKEN',
    RestApiId: {
      Ref: 'ApiGatewayRestApi'
    },
    StatusCode: '401'
  }
}

export const authFailureGatewayResponseResource = {
  Type: 'AWS::ApiGateway::GatewayResponse',
  Properties: {
    ResponseParameters: {
      'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
      'gatewayresponse.header.Access-Control-Allow-Headers': "'*'"
    },
    ResponseType: 'UNAUTHORIZED',
    RestApiId: {
      Ref: 'ApiGatewayRestApi'
    },
    StatusCode: '401'
  }
}

export const denyFailureGatewayResponseResource = {
  Type: 'AWS::ApiGateway::GatewayResponse',
  Properties: {
    ResponseParameters: {
      'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
      'gatewayresponse.header.Access-Control-Allow-Headers': "'*'"
    },
    ResponseType: 'ACCESS_DENIED',
    RestApiId: {
      Ref: 'ApiGatewayRestApi'
    },
    StatusCode: '403'
  }
}
