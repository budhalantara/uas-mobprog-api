import express, { Router } from 'express'
import fileController from './controller.js'
import asyncWrapper from '../../helper/asyncWrapper.js'

asyncWrapper([fileController])

const fileRouter = Router()

fileRouter.use('/files', express.static('public'))
fileRouter.post('/files', fileController.upload)

export default fileRouter
