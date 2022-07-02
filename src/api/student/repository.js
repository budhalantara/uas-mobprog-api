import db from '../../helper/db.js'

const studentRepository = {
  async getAll() {
    const query = `
      SELECT
        id,
        name,
        phone_number,
        address,
        gender,
        profile_image,
        created_at
      FROM students
      WHERE
        deleted_at IS NULL
    `
    const [res] = await db.query(query)
    return res
  },

  async create(data) {
    const query = `
      INSERT INTO students(
        id,
        name,
        phone_number,
        address,
        gender,
        profile_image,
        created_at
      )
      VALUES(
        :id,
        :name,
        :phone_number,
        :address,
        :gender,
        :profile_image,
        :created_at
      )
    `
    const [res] = await db.query(query, { ...data, created_at: new Date() })
    return res
  },

  async update(id, data) {
    const query = `
      UPDATE students
      SET
        name = :name,
        phone_number = :phone_number,
        address = :address,
        gender = :gender,
        profile_image = :profile_image
      WHERE
        id = :id
    `
    const [res] = await db.query(query, { ...data, id })
    return res
  },

  async delete(id) {
    const query = `
      UPDATE students
      SET
        deleted_at = :deleted_at
      WHERE
        id = :id
    `
    const [res] = await db.query(query, { deleted_at: new Date(), id })
    return res
  },
}

export default studentRepository
