import { Router } from 'express'
import studentController from './controller.js'
import asyncWrapper from '../../helper/asyncWrapper.js'
import authMiddleware from '../../api/auth/middleware.js'

asyncWrapper([studentController])

const studentRouter = Router()

studentRouter.get('/students', authMiddleware, studentController.getAll)
studentRouter.post('/students', authMiddleware, studentController.create)
studentRouter.put('/students/:id', authMiddleware, studentController.update)
studentRouter.delete('/students/:id', authMiddleware, studentController.delete)

export default studentRouter
