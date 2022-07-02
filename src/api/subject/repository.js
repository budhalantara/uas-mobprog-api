import db from '../../helper/db.js'

const subjectRepository = {
  async getAll() {
    const query = `
      SELECT
        id,
        major_id,
        name,
        credits,
        created_at
      FROM subjects
      WHERE
        deleted_at IS NULL
    `
    const [res] = await db.query(query)
    return res
  },

  async getByID(id) {
    const query = `
      SELECT
        id,
        major_id,
        name,
        credits,
        created_at
      FROM subjects
      WHERE
        id = :id
    `
    const [res] = await db.query(query, { id })
    return res[0]
  },

  async create(data) {
    const query = `
      INSERT INTO subjects(
        id,
        major_id,
        name,
        credits,
        created_at
      )
      VALUES(
        :id,
        :major_id,
        :name,
        :credits,
        :created_at
      )
    `
    const [res] = await db.query(query, { ...data, created_at: new Date() })
    return res
  },

  async update(id, data) {
    const query = `
      UPDATE subjects
      SET
        major_id = :major_id,
        name = :name,
        credits = :credits
      WHERE
        id = :id
    `
    const [res] = await db.query(query, { ...data, id })
    return res
  },

  async delete(id) {
    const query = `
      UPDATE subjects
      SET
        deleted_at = :deleted_at
      WHERE
        id = :id
    `
    const [res] = await db.query(query, { deleted_at: new Date(), id })
    return res
  },
}

export default subjectRepository
