import majorRepository from './repository.js'
import yup from 'yup'
import ApiError from '../../helper/ApiError.js'

const majorController = {
  async getAll(req, res) {
    const data = await majorRepository.getAll()
    return res.json({ success: true, data })
  },

  async create(req, res) {
    const schema = yup.object({
      id: yup.string().required(),
      name: yup.string().required(),
    })

    const data = await schema.validate(req.body, { abortEarly: false })

    try {
      await majorRepository.create(data)
    } catch (error) {
      const isExist = error.sqlMessage?.indexOf('Duplicate entry') > -1
      if (isExist) {
        throw ApiError.UNPROCESSABLE_ENTITY({
          message: `Jurusan dengan kode ${data.id} sudah ada`,
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
    })

    const data = await schema.validate(req.body, { abortEarly: false })
    await majorRepository.update(req.params.id, data)

    return res.json({
      success: true,
    })
  },

  async delete(req, res) {
    await majorRepository.delete(req.params.id)

    return res.json({
      success: true,
    })
  },
}

export default majorController
