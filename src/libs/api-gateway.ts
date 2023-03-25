import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler
} from 'aws-lambda'
import createHttpError from 'http-errors'
import type {
  CreateHttpError,
  HttpError,
  IsHttpError,
  NamedConstructors
} from 'http-errors'
import type { FromSchema } from 'json-schema-to-ts'

type ValidatedAPIGatewayProxyEvent<S> = Omit<APIGatewayProxyEvent, 'body'> & {
  body: FromSchema<S>
}
export type ValidatedEventAPIGatewayProxyEvent<S> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>

export const makeJSONError = (
  fn: (
    errorCreator: CreateHttpError &
      NamedConstructors & { isHttpError: IsHttpError }
  ) => HttpError,
  extraResponse?: Record<string, unknown>
) => {
  const error = fn(createHttpError)

  return {
    statusCode: error.statusCode,
    body: JSON.stringify({ ...extraResponse, message: error.message })
  }
}
