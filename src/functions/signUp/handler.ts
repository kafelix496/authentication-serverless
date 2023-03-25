import AWS from 'aws-sdk'

import validator from '@middy/validator'
import { transpileSchema } from '@middy/validator/transpile'

import {
  ValidatedEventAPIGatewayProxyEvent,
  makeJSONError
} from '@libs/api-gateway'
import { commonMiddleware } from '@libs/lambda'

import { hashPassword } from '@utils/password'

import { schemaForType, schemaForValidator } from './schema'

const dynamodb = new AWS.DynamoDB.DocumentClient()

const signUp: ValidatedEventAPIGatewayProxyEvent<typeof schemaForType> = async (
  event
) => {
  try {
    const { name, email, password } = event.body

    if (email && name && password) {
      const { Item } = await dynamodb
        .get({
          TableName: process.env.USERS_TABLE_NAME,
          Key: { email }
        })
        .promise()

      if (Item) {
        return makeJSONError((errorCreator) =>
          errorCreator.BadRequest('This email is already in use.')
        )
      }

      const hashedPassword = await hashPassword(password)

      // TODO: Check if user already exists
      // TODO: Send email to verify account
      await dynamodb
        .put({
          TableName: process.env.USERS_TABLE_NAME,
          Item: {
            email,
            name,
            password: hashedPassword
          }
        })
        .promise()

      return {
        statusCode: 201,
        body: JSON.stringify({ success: true })
      }
    }

    return makeJSONError((errorCreator) =>
      errorCreator.BadRequest('Enter a valid name/email/password')
    )
  } catch (error) {
    console.error('error', error)

    return makeJSONError((errorCreator) =>
      errorCreator.InternalServerError(
        'Unexpected Server Error. Please try it again later.'
      )
    )
  }
}

export const main = commonMiddleware(signUp).use(
  validator({
    eventSchema: transpileSchema(schemaForValidator)
  })
)
