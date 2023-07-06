import express from "express"
import { engine } from "express-handlebars"
import session from "express-session"
import path from "path"
import passport from "passport"
import cookieParser from "cookie-parser"

import { __dirname } from "./dirname.js"
import { initPassport } from "./config/passport.config.js"
import { SESSION_SECRET } from "./config/config.js"

/* ------------------------------------------------------------------------------ */
/* --------------------------------- Routes Api --------------------------------- */
/* ------------------------------------------------------------------------------ */
import RoutesSession from "./routes/session/session.routes.js"
import RoutesProduct from "./routes/product/product.routes.js"
import RoutesCart from "./routes/cart/cart.routes.js"

/* ------------------------------------------------------------------------------ */
/* ------------------------------- Routes Render -------------------------------- */
/* ------------------------------------------------------------------------------ */
import RoutesRenderSession from "./routes/session/session.routes.views.js"
import RoutesRenderProduct from "./routes/product/product.routes.views.js"
import RoutesRenderCart from "./routes/cart/cart.routes.views.js"

const app = express()

app.use(session({
	cookie: { httpOnly: true },
	secret: SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))

initPassport()
app.use(passport.initialize())
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(`${__dirname}/public`))
app.use(express.static(path.join(`${__dirname}/views`)))

app.engine(".hbs", engine({ extname: ".hbs" }))
app.set("views", `${__dirname}/views`)
app.set("view engine", "hbs")

app.use("/api/session", RoutesSession)
app.use("/api/products", RoutesProduct)
app.use("/api/carts", RoutesCart)

/* ------------------------------------------------------------------------------ */
/* ----------------------------- Routes Render Links ---------------------------- */
/* ------------------------------------------------------------------------------ */
app.use("/", RoutesRenderSession)
app.use("/products", RoutesRenderProduct)
app.use("/carts", RoutesRenderCart)

app.get("*", (req, res) => res.sendStatus(404))

export default app