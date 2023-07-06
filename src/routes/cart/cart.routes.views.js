import { Router } from "express"
import { HandleRenderCartDetail, HandleRenderCarts } from "../../controllers/cart/cart.controllers.views.js"
import { requireSession } from "../../middlewares/session.middleware.js"

const router = Router()

router.get("/", requireSession, HandleRenderCarts)
router.get("/:cid", requireSession, HandleRenderCartDetail)

export default router