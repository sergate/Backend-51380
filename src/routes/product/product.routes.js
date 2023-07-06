import { Router } from "express"

import { HandleCreate, HandleDelete, HandleGetAll, HandleGetOne, HandleUpdate } from "../../controllers/product/product.controllers.js"
import { requireSession } from "../../middlewares/session.middleware.js"

const router = Router()

router.get("/", requireSession, HandleGetAll)
router.post("/", requireSession, HandleCreate)

router.get("/:pid", requireSession, HandleGetOne)
router.put("/:pid", requireSession, HandleUpdate)
router.delete("/:pid", requireSession, HandleDelete)

export default router