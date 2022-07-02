import parseForm from '../../helper/parseForm.js'
import yup from 'yup'
import fse from 'fs-extra'
import crypto from 'crypto'
import path from 'path'

function getNewFileName(file) {
  const name = path.basename(file.path)
  const md5 = crypto.createHash('md5')
  md5.update(name)
  const hashed = md5.digest('hex')
  const ext = path.extname(file.name)
  return hashed + ext
}

const fileController = {
  async upload(req, res) {
    const { files } = await parseForm(req, { maxFileSize: 5 * 1024 * 1024 })

    const schema = yup.object({
      file: yup.mixed().required(),
    })

    const { file } = await schema.validate(files, { abortEarly: false })

    const newFileName = getNewFileName(file)
    const dest = `public/${newFileName}`
    await fse.move(file.path, dest)

    return res.json({
      success: true,
      data: {
        name: newFileName,
      },
    })
  },
}

export default fileController
