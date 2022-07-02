import { Router } from 'express'
import lecturerController from './controller.js'
import asyncWrapper from '../../helper/asyncWrapper.js'

asyncWrapper([lecturerController])

const lecturerRouter = Router()

lecturerRouter.get('/lecturers', lecturerController.getAll)
lecturerRouter.post('/lecturers', lecturerController.create)
lecturerRouter.put('/lecturers/:id', lecturerController.update)
lecturerRouter.delete('/lecturers/:id', lecturerController.delete)

export default lecturerRouter
