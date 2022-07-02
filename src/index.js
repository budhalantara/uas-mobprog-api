import 'dotenv/config'
import express from 'express'
import db from './helper/db.js'
import { ValidationError } from 'yup'
import ApiError from './helper/ApiError.js'
import fileRouter from './api/file/router.js'
import studentRouter from './api/student/router.js'

const app = express()

app.disable('x-powered-by')
app.use(express.json())

app.use(fileRouter)
app.use(studentRouter)

app.use((req) => {
  console.log('Not Found:', req.method, req.path)
  throw ApiError.NOT_FOUND({ message: 'No route found.' })
})

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.code).json({
      success: false,
      message: err.message,
      errors: err.errors,
    })
  } else if (err instanceof ValidationError) {
    res.status(400).json({
      success: false,
      message: 'Bad Request.',
      errors: err.errors,
    })
  } else if (err.constructor.name === 'SyntaxError' && err.statusCode === 400) {
    res.status(400).json({
      success: false,
      message: 'Parsing data failed.',
    })
  } else {
    console.log(err)
    res.status(500).json({
      success: false,
      message: 'Sedang terjadi kesalahan. Silahkan coba lagi nanti.',
    })
  }
})

const { PORT } = process.env

if (!PORT) {
  throw Error('PORT env is missing')
}

db.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`))
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
