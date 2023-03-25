import AWS from 'aws-sdk'

import {
  ValidatedEventAPIGatewayProxyEvent,
  makeJSONError
} from '@libs/api-gateway'
import { commonMiddleware } from '@libs/lambda'

import { generateAccessToken, generateRefreshTokenCookie } from '@utils/jwt'
import { matchPassword } from '@utils/password'

import { schemaForType } from './schema'

const dynamodb = new AWS.DynamoDB.DocumentClient()

const signIn: ValidatedEventAPIGatewayProxyEvent<typeof schemaForType> = async (
  event
) => {
  try {
    const { email, password } = event.body

    if (email && password) {
      const { Item } = await dynamodb
        .get({
          TableName: process.env.USERS_TABLE_NAME,
          Key: { email }
        })
        .promise()

      if (!Item) {
        return makeJSONError((errorCreator) =>
          errorCreator.NotFound("We don't have any matching data.")
        )
      }

      const { password: hashedPassword } = Item
      const matchedPassword = await matchPassword(password, hashedPassword)

      if (matchedPassword) {
        const access = generateAccessToken(email, 5)
        const cookie = generateRefreshTokenCookie(email, 1)

        return {
          statusCode: 200,
          headers: {
            'Set-Cookie': cookie
          },
          body: JSON.stringify({ name: Item.name, email: Item.email, access })
        }
      }

      return makeJSONError((errorCreator) =>
        errorCreator.BadRequest("We don't have any matching data.")
      )
    }
  } catch (error) {
    console.error('error', error)

    return makeJSONError((errorCreator) =>
      errorCreator.InternalServerError(
        'Unexpected Server Error. Please try it again later.'
      )
    )
  }
}

export const main = commonMiddleware(signIn)
