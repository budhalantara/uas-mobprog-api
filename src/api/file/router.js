import express, { Router } from 'express'
import fileController from './controller.js'
import asyncWrapper from '../../helper/asyncWrapper.js'
import authMiddleware from '../../api/auth/middleware.js'

asyncWrapper([fileController])

const fileRouter = Router()

fileRouter.use('/files', express.static('public'))
fileRouter.post('/files', authMiddleware, fileController.upload)

export default fileRouter
