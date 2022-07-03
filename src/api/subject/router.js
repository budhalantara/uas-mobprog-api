import { Router } from 'express'
import subjectController from './controller.js'
import asyncWrapper from '../../helper/asyncWrapper.js'
import authMiddleware from '../../api/auth/middleware.js'

asyncWrapper([subjectController])

const subjectRouter = Router()

subjectRouter.get('/subjects', authMiddleware, subjectController.getAll)
subjectRouter.post('/subjects', authMiddleware, subjectController.create)
subjectRouter.put('/subjects/:id', authMiddleware, subjectController.update)
subjectRouter.delete('/subjects/:id', authMiddleware, subjectController.delete)

export default subjectRouter
