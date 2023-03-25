import { handlerPath } from '@libs/handler-resolver'

import { schemaForType } from './schema'

export const signUp = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'sign-up',
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
