import ApiError from '../../helper/ApiError.js'
import asyncWrapper from '../../helper/asyncWrapper.js'
import jwt from 'jsonwebtoken'

const authMiddleware = asyncWrapper(async (req, res, next) => {
  const { authorization: authHeader } = req.headers
  const accessToken = authHeader?.split('Bearer ').pop()
  if (!accessToken) {
    throw ApiError.UNAUTHORIZED({ message: 'Access token is required' })
  }

  try {
    const { sub, username, name } = jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    )
    req.user = {
      id: sub,
      username,
      name,
    }
  } catch (error) {
    if (error.message !== 'jwt expired') {
      console.log(`${error.name}: ${error.message}`)
    }
    throw ApiError.UNAUTHORIZED({ message: 'Invalid access token' })
  }

  next()
})

export default authMiddleware
