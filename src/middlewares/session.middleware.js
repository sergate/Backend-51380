export const requireSession = (req, res, next) => {
	if (!req.cookies.jwt) {
		req.session.destroy()
		return res.redirect("/signin")
	}
	if (!req.session.user) {
		res.clearCookie("jwt")
		return res.redirect("/signin")
	}
	return next()
}