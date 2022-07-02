import path from 'path'
import formidable from 'formidable'
import fse from 'fs-extra'

const uploadDir = path.resolve('tmp')
const defaultOptions = {
  uploadDir,
}

export default async function parseForm(req, options) {
  await fse.mkdirp(uploadDir)
  return new Promise((resolve, reject) => {
    options = {
      ...defaultOptions,
      ...options,
    }

    const form = formidable(options)
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })
}
