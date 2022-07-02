const path = require('path')
const formidable = require('formidable')
const fse = require('fs-extra')

const uploadDir = path.resolve('public')
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
