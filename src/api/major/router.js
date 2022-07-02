import { Router } from 'express'
import majorController from './controller.js'
import asyncWrapper from '../../helper/asyncWrapper.js'

asyncWrapper([majorController])

const majorRouter = Router()

majorRouter.get('/majors', majorController.getAll)
majorRouter.post('/majors', majorController.create)
majorRouter.put('/majors/:id', majorController.update)
majorRouter.delete('/majors/:id', majorController.delete)

export default majorRouter
