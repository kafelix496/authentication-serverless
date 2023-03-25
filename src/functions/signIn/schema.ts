export const schemaForType = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' }
  },
  required: ['email', 'password']
} as const

export const schemaForValidator = {
  type: 'object',
  properties: {
    body: {
      ...schemaForType
    }
  },
  required: ['body']
} as const
