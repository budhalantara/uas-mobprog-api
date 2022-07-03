import { Router } from 'express'
import majorController from './controller.js'
import asyncWrapper from '../../helper/asyncWrapper.js'
import authMiddleware from '../../api/auth/middleware.js'

asyncWrapper([majorController])

const majorRouter = Router()

majorRouter.get('/majors', authMiddleware, majorController.getAll)
majorRouter.post('/majors', authMiddleware, majorController.create)
majorRouter.put('/majors/:id', authMiddleware, majorController.update)
majorRouter.delete('/majors/:id', authMiddleware, majorController.delete)

export default majorRouter
