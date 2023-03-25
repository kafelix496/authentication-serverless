export const schemaForType = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 1 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 8 }
  },
  required: ['name', 'email', 'password']
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
