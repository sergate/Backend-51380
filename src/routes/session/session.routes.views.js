import { Router } from "express"
import { HandleRenderSignIn, HandleRenderSignUp } from "../../controllers/session/session.controllers.views.js"

const router = Router()

router.get("/signin", HandleRenderSignIn)
router.get("/signup", HandleRenderSignUp)

export default router