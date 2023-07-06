import { cartService } from "../../dao/services/cart.service.js"

export const HandleRenderCarts = async (req, res) => {
	const result = await cartService.getAll()

	let user
	if (req.session.user) {
		user = req.session.user.first_name
	}

	res.render("cart/table", { title: "Carts", data: result.payload, user })
}

export const HandleRenderCartDetail = async (req, res) => {
	const { cid } = req.params

	const result = await cartService.getOne(cid)

	let user
	if (req.session.user) {
		user = req.session.user.first_name
	}

	res.render("cart/detail", { title: "Cart", data: result.payload.products, user })
}