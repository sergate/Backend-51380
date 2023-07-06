import { productService } from "../../dao/services/product.service.js"

export const HandleRenderProducts = async (req, res) => {
	const { page = 1, limit = 10 } = req.query

	let user
	if (req.session.user) {
		user = req.session.user.first_name
	}

	const result = await productService.getAll(page, limit)

	res.render("product/table", { title: "Products", data: result.payload, user })
}

export const HandleRenderProductDetail = async (req, res) => {
	const { pid } = req.params

	const result = await productService.getOne(pid)

	let user
	if (req.session.user) {
		user = req.session.user.first_name
	}

	res.render("product/detail", { title: result.payload.title, product: result.payload, user })
}