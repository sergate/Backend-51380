import passport from "passport"
// import github2 from "passport-github2"
import jwt, { ExtractJwt } from "passport-jwt"
import { userService } from "../dao/services/user.service.js"

// import { PASSPORT_GITHUB_CALLBACKURL, PASSPORT_GITHUB_CLIENTID, PASSPORT_GITHUB_CLIENTSECRET } from "./config.js"

const JwtStrategy = jwt.Strategy
// const GitHubStrategy = github2.Strategy

export const initPassport = () => {
	passport.use("signin", new JwtStrategy({
		passReqToCallback: true,
		jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
		secretOrKey: "secret"
	}, async (req, jwt_payload, done) => {
		try {
			const exist = await userService.getOne(jwt_payload.email)
			if (!exist.payload) return done(null, false, "User not found")
			const { password } = req.body
			const isValid = await userService.validatePassword(exist.payload, password)
			if (!isValid.payload) return done(null, false, "Invalid Password")
			const obj = {
				first_name: exist.payload.first_name,
				last_name: exist.payload.last_name,
				email: exist.payload.email,
				age: exist.payload.age,
				cart: exist.payload.cart,
				role: exist.payload.role
			}
			return done(null, obj)
		} catch (error) {
			return done(error)
		}
	}))

	passport.use("signup", new JwtStrategy({
		passReqToCallback: true,
		jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
		secretOrKey: "secret"
	}, async (req, jwt_payload, done) => {
		try {
			const { first_name, last_name, age, password } = req.body
			const exist = await userService.getOne(jwt_payload.email)
			if (exist.payload) return done(null, false, "User already exists")
			const user = { first_name, last_name, email: jwt_payload.email, age, password }
			const result = await userService.create(user)
			const obj = {
				first_name: result.payload.first_name,
				last_name: result.payload.last_name,
				email: result.payload.email,
				age: result.payload.age,
				cart: result.payload.cart,
				role: result.payload.role
			}
			return done(null, obj)
		} catch (error) {
			return done(error)
		}
	}))

	passport.serializeUser((user, done) => {
		done(null, user)
	})

	passport.deserializeUser((user, done) => {
		done(null, user)
	})
}

const cookieExtractor = (req) => {
	let token = null
	if (req && req.cookies) token = req.cookies.jwt
	return token
}