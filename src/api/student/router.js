import { Router } from 'express'
import studentController from './controller.js'
import asyncWrapper from '../../helper/asyncWrapper.js'

asyncWrapper([studentController])

const studentRouter = Router()

studentRouter.get('/students', studentController.getAll)
studentRouter.post('/students', studentController.create)
studentRouter.put('/students/:id', studentController.update)
studentRouter.delete('/students/:id', studentController.delete)

export default studentRouter
