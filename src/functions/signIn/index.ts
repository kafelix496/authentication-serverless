import { handlerPath } from '@libs/handler-resolver'

import { schemaForType } from './schema'

export const signIn = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'sign-in',
        request: {
          schemas: {
            'application/json': schemaForType
          }
        },
        cors: true
      }
    }
  ]
}
