import db from '../../helper/db.js'

const authRepository = {
  async getByUsername(username) {
    const query = `
      SELECT
        id,
        username,
        password,
        name
      FROM users
      WHERE
        username = :username
    `
    const [[user]] = await db.query(query, { username })
    return user
  },
}

export default authRepository
