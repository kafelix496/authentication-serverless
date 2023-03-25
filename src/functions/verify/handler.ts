import AWS from 'aws-sdk'
import type { JwtPayload } from 'jsonwebtoken'
import { VerificationCode } from 'src/constants/verify'

import {
  ValidatedEventAPIGatewayProxyEvent,
  makeJSONError
} from '@libs/api-gateway'
import { commonMiddleware } from '@libs/lambda'

import { verifyAccessToken } from '@utils/jwt'

import { schemaForType } from './schema'

const dynamodb = new AWS.DynamoDB.DocumentClient()

const verify: ValidatedEventAPIGatewayProxyEvent<typeof schemaForType> = async (
  event
) => {
  const authorization = event.headers.Authorization.split(' ')[1]
  try {
    const decoded = verifyAccessToken(authorization)
    const { Item } = await dynamodb
      .get({
        TableName: process.env.USERS_TABLE_NAME,
        Key: { email: (decoded as JwtPayload).userId }
      })
      .promise()

    if (!Item) {
      return makeJSONError(
        (errorCreator) =>
          errorCreator.NotFound("We don't have any matching data."),
        { code: VerificationCode.INVALID_USER }
      )
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ name: Item.name, email: Item.email })
    }
  } catch (error) {
    switch (error?.name) {
      case 'TokenExpiredError': {
        return makeJSONError(
          (errorCreator) => errorCreator.Unauthorized('Token is expired.'),
          { code: VerificationCode.EXPIRED_TOKEN }
        )
      }

      default: {
        console.error('error', error)

        return makeJSONError(
          (errorCreator) => errorCreator.Unauthorized('Token is not valid'),
          { code: VerificationCode.INVALID_TOKEN, authorization }
        )
      }
    }
  }
}

export const main = commonMiddleware(verify)
