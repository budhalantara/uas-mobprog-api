import authRepository from './repository.js'
import ApiError from '../../helper/ApiError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authController = {
  async login(req, res) {
    const { username, password } = req.body
    const user = await authRepository.getByUsername(username)
    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw ApiError.UNAUTHORIZED({ message: 'Username atau password salah' })
    }

    const accessToken = jwt.sign(
      { sub: user.id, username: user.username, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    )

    return res.json({
      success: true,
      data: { access_token: accessToken },
    })
  },
}

export default authController
