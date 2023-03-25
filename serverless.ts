import { usersTableIAM } from '@iams/usersTable'

import {
  authFailureGatewayResponseResource,
  denyFailureGatewayResponseResource,
  expiredGatewayResponseResource
} from '@resources/gatewayResponse'
import { usersTableResource } from '@resources/usersTable'

import { signIn } from '@functions/signIn'
import { signUp } from '@functions/signUp'
import { verify } from '@functions/verify'

import type { AWS } from '@serverless/typescript'

const serverlessConfiguration: AWS = {
  service: 'authentication',
  frameworkVersion: '3',
  plugins: ['serverless-bundle'],
  useDotenv: true,
  provider: {
    name: 'aws',
    profile: 'authentication',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      USERS_TABLE_NAME: {
        Ref: 'usersTableResource'
      },
      JWT_ACCESS_SECRET: '${env:JWT_ACCESS_SECRET}',
      JWT_REFRESH_SECRET: '${env:JWT_REFRESH_SECRET}'
    },
    memorySize: 128,
    stage: "${opt:stage, 'dev'}",
    region: 'us-east-1',
    iam: {
      role: {
        statements: [
          {
            ...usersTableIAM
          }
        ]
      }
    }
  },
  functions: { signIn, signUp, verify },
  package: { individually: true },
  resources: {
    Resources: {
      expiredGatewayResponseResource,
      authFailureGatewayResponseResource,
      denyFailureGatewayResponseResource,
      usersTableResource
    }
  },
  custom: {}
}

module.exports = serverlessConfiguration
