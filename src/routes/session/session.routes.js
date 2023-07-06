import { Router } from "express"

import { strategyPassport } from "../../utils/passport.utils.js"
import { HandleCurrent, HandleGenerateCookie, HandleLogout, HandleSignIn, HandleSignUp } from "../../controllers/session/session.controllers.js"
import { requireSession } from "../../middlewares/session.middleware.js"

const router = Router()

router.get("/current", requireSession, HandleCurrent)

router.post("/cookie", HandleGenerateCookie)
router.post("/signin",
	strategyPassport("signin"),
	HandleSignIn
)
router.post("/signup",
	strategyPassport("signup"),
	HandleSignUp
)

router.delete("/logout", requireSession, HandleLogout)

export default router