import { Router } from 'express'
import subjectController from './controller.js'
import asyncWrapper from '../../helper/asyncWrapper.js'

asyncWrapper([subjectController])

const subjectRouter = Router()

subjectRouter.get('/subjects', subjectController.getAll)
subjectRouter.post('/subjects', subjectController.create)
subjectRouter.put('/subjects/:id', subjectController.update)
subjectRouter.delete('/subjects/:id', subjectController.delete)

export default subjectRouter
