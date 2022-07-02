import subjectRepository from './repository.js'
import yup from 'yup'
import ApiError from '../../helper/ApiError.js'
import { randomString } from '../../helper/randomize.js'
import majorRepository from '../major/repository.js'

const subjectController = {
  async getAll(req, res) {
    const data = await subjectRepository.getAll()
    return res.json({ success: true, data })
  },

  async create(req, res) {
    const schema = yup.object({
      major_id: yup.string().required(),
      name: yup.string().required(),
      credits: yup.number().required(),
    })

    const data = await schema.validate(req.body, { abortEarly: false })
    const major = await majorRepository.getByID(data.major_id)
    if (!major) {
      throw ApiError.UNPROCESSABLE_ENTITY({ message: 'Jurusan tidak valid' })
    }

    let id = randomString(4, true)
    let stop = false
    while (!stop) {
      const subject = await subjectRepository.getByID(id)
      if (subject) {
        id = randomString(4, true)
      } else {
        stop = true
      }
    }

    await subjectRepository.create({ ...data, id })

    return res.json({
      success: true,
    })
  },

  async update(req, res) {
    const schema = yup.object({
      major_id: yup.string().required(),
      name: yup.string().required(),
      credits: yup.number().required(),
    })

    const data = await schema.validate(req.body, { abortEarly: false })
    await subjectRepository.update(req.params.id, data)

    return res.json({
      success: true,
    })
  },

  async delete(req, res) {
    await subjectRepository.delete(req.params.id)

    return res.json({
      success: true,
    })
  },
}

export default subjectController
