import { handlerPath } from '@libs/handler-resolver'

export const verify = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'verify',
        cors: true
      }
    }
  ]
}
