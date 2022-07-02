import lecturerRepository from './repository.js'
import yup from 'yup'
import ApiError from '../../helper/ApiError.js'

const lecturerController = {
  async getAll(req, res) {
    const data = await lecturerRepository.getAll()
    return res.json({ success: true, data })
  },

  async create(req, res) {
    const schema = yup.object({
      id: yup.string().required(),
      name: yup.string().required(),
      phone_number: yup.string().required(),
      address: yup.string().required(),
      gender: yup.string().required(),
      profile_image: yup.string().required(),
    })

    const data = await schema.validate(req.body, { abortEarly: false })

    try {
      await lecturerRepository.create(data)
    } catch (error) {
      const isExist = error.sqlMessage?.indexOf('Duplicate entry') > -1
      if (isExist) {
        throw ApiError.UNPROCESSABLE_ENTITY({
          message: `Dosen dengan NIP/NIDN ${data.id} sudah ada`,
        })
      }
      throw error
    }

    return res.json({
      success: true,
    })
  },

  async update(req, res) {
    const schema = yup.object({
      name: yup.string(),
      phone_number: yup.string(),
      address: yup.string(),
      gender: yup.string(),
      profile_image: yup.string(),
    })

    const data = await schema.validate(req.body, { abortEarly: false })
    await lecturerRepository.update(req.params.id, data)

    return res.json({
      success: true,
    })
  },

  async delete(req, res) {
    await lecturerRepository.delete(req.params.id)

    return res.json({
      success: true,
    })
  },
}

export default lecturerController
