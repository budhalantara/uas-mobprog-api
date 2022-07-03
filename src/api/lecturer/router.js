import { Router } from 'express'
import lecturerController from './controller.js'
import asyncWrapper from '../../helper/asyncWrapper.js'
import authMiddleware from '../../api/auth/middleware.js'

asyncWrapper([lecturerController])

const lecturerRouter = Router()

lecturerRouter.get('/lecturers', authMiddleware, lecturerController.getAll)
lecturerRouter.post('/lecturers', authMiddleware, lecturerController.create)
lecturerRouter.put('/lecturers/:id', authMiddleware, lecturerController.update)
lecturerRouter.delete('/lecturers/:id', authMiddleware, lecturerController.delete)

export default lecturerRouter
