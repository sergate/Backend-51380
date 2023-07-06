import { Router } from "express"

import { HandleRenderProductDetail, HandleRenderProducts } from "../../controllers/product/product.controllers.views.js"
import { requireSession } from "../../middlewares/session.middleware.js"

const router = Router()

router.get("/", requireSession, HandleRenderProducts)
router.get("/:pid", requireSession, HandleRenderProductDetail)

export default router