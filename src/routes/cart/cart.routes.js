import { Router } from "express"

import { HandleCreate, HandleDelete, HandleGetAll, HandleGetOne, HandleProductAdd, HandleProductRemove, HandleProductUpdate, HandleUpdate } from "../../controllers/cart/cart.controllers.js"
import { requireSession } from "../../middlewares/session.middleware.js"

const router = Router()

router.get("/", requireSession, HandleGetAll)
router.post("/", requireSession, HandleCreate)

router.get("/:cid", requireSession, HandleGetOne)
router.put("/:cid", requireSession, HandleUpdate)
router.delete("/:cid", requireSession, HandleDelete)

router.post("/:cid/product/:pid", requireSession, HandleProductAdd)
router.put("/:cid/product/:pid", requireSession, HandleProductUpdate)
router.delete("/:cid/product/:pid", requireSession, HandleProductRemove)

export default router