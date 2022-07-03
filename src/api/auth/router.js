import { Router } from 'express'
import authController from './controller.js'
import asyncWrapper from '../../helper/asyncWrapper.js'

asyncWrapper([authController])

const authRouter = Router()

authRouter.post('/auth/login', authController.login)

export default authRouter
