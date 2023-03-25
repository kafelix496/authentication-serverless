import bcrypt from 'bcryptjs'

const ITERATIONS = 11

export const hashPassword = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, ITERATIONS)

  return hash
}

export const matchPassword = async (
  password: string,
  encrypted: string
): Promise<boolean> => {
  const match = await bcrypt.compare(password, encrypted)

  return match
}
