import bcrypt from "bcrypt"

const saltRounds = Number(process.env.SALT_ROUNDS)

export async function hashPassword(password) {
  return bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(plain_password, hashed_password) {
  return bcrypt.compare(plain_password, hashed_password)
}
