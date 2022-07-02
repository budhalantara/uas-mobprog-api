import db from '../../helper/db.js'

const majorRepository = {
  async getAll() {
    const query = `
      SELECT
        id,
        name,
        created_at
      FROM majors
      WHERE
        deleted_at IS NULL
    `
    const [res] = await db.query(query)
    return res
  },

  async create(data) {
    const query = `
      INSERT INTO majors(
        id,
        name,
        created_at
      )
      VALUES(
        :id,
        :name,
        :created_at
      )
    `
    const [res] = await db.query(query, { ...data, created_at: new Date() })
    return res
  },

  async update(id, data) {
    const query = `
      UPDATE majors
      SET
        name = :name
      WHERE
        id = :id
    `
    const [res] = await db.query(query, { ...data, id })
    return res
  },

  async delete(id) {
    const query = `
      UPDATE majors
      SET
        deleted_at = :deleted_at
      WHERE
        id = :id
    `
    const [res] = await db.query(query, { deleted_at: new Date(), id })
    return res
  },
}

export default majorRepository
