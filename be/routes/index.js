import { Router } from "express"
import { createUser, greetings, adminLogin, verifyUserEmail } from "../handlers/index.js"

const appRouter = Router()

appRouter.get('/', greetings)
appRouter.post('/register', createUser)
appRouter.get('/verify', verifyUserEmail)
appRouter.post('/admin-login', adminLogin)

export default appRouter