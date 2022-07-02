import db from '../../helper/db.js'

const lecturerRepository = {
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
      FROM lecturers
      WHERE
        deleted_at IS NULL
    `
    const [res] = await db.query(query)
    return res
  },

  async create(data) {
    const query = `
      INSERT INTO lecturers(
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
      UPDATE lecturers
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
      UPDATE lecturers
      SET
        deleted_at = :deleted_at
      WHERE
        id = :id
    `
    const [res] = await db.query(query, { deleted_at: new Date(), id })
    return res
  },
}

export default lecturerRepository
