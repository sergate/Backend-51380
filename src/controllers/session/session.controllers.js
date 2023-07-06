import jwt from "jsonwebtoken"
import { ResponseData, ResponseError } from "../../dao/models/response.model.js"
import { JWT_SECRET, JWT_AGE, COOKIE_AGE } from "../../config/config.js"

export const HandleGenerateCookie = async (req, res) => {
	const { email } = req.body
	if (email === undefined) {
		const response = new ResponseError(400, null, "All fields are required")
		res.status(400).json(response)
	} else {
		const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: JWT_AGE })
		await res.cookie("jwt", token, {
			httpOnly: true,
			maxAge: COOKIE_AGE
		})
		const response = new ResponseData(200, "Set cookie Success")
		res.json(response)
	}
}

export const HandleSignIn = (req, res) => {
	req.session.user = req.user
	res.redirect("/api/session/current")
}

export const HandleSignUp = (req, res) => {
	req.session.user = req.user
	res.redirect("/api/session/current")
}

export const HandleCurrent = (req, res) => {
	const response = new ResponseData(200, req.session.user)
	res.json(response)
}

export const HandleLogout = async (req, res) => {
	try {
		res.clearCookie("jwt")
		req.session.destroy(err => {
			const response = new ResponseData(200, "Logout Successful")
			if (!err) res.json(response)
			else res.json({ status: 401, payload: null, error: "I couldn't log out" })
		})
	} catch (error) {
		req.status(400).send({ error })
	}
}