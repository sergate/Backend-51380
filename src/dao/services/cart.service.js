import { responseData, responseError } from "../../utils/response.utils.js"
import { cartModel } from "../schemas/cart.schema.js"
import { ProductCart } from "../models/productCart.model.js"
import { Cart } from "../models/cart.model.js"
import { MONGOOSE_DB_COLLECTION_PRODUCTS } from "../../config/config.js"

class CartService {
	async getAll () {
		try {
			const result = await cartModel.find().populate(`${MONGOOSE_DB_COLLECTION_PRODUCTS}.product`).lean()
			return responseData(200, result)
		} catch (error) {
			return responseError(500, null, "Internal Server Error")
		}
	}

	async getOne (cid) {
		try {
			const result = await cartModel.findOne({ _id: cid }).populate(`${MONGOOSE_DB_COLLECTION_PRODUCTS}.product`).lean()
			if (!result) return responseError(404, null, "Cart not found")
			return responseData(200, result)
		} catch (error) {
			return responseError(500, null, "Internal Server Error")
		}
	}

	async create () {
		try {
			const cart = new Cart()
			const result = await cartModel.create(cart)
			return responseData(201, result)
		} catch (error) {
			return responseError(500, null, "Internal Server Error")
		}
	}

	async update (cid, obj) {
		try {
			if (!(
				cid &&
                obj
			)) return responseError(400, null, "All fields are required")
			const exist = await cartModel.findOne({ _id: cid })
			if (!exist) return responseError(404, null, "Cart not found")

			const result = await cartModel.updateOne({ _id: cid }, obj)

			const { modifiedCount } = result
			if (!(modifiedCount > 0)) return responseError(202, null, "Not modified")
			return responseData(200, obj)
		} catch (error) {
			return responseError(500, null, "Internal Server Error")
		}
	}

	async delete (cid) {
		try {
			const exist = await cartModel.findById(cid)
			if (!exist) return responseError(404, null, "Cart Not found")

			const result = await cartModel.deleteOne({ _id: cid })
			const { deletedCount } = result
			if (!(deletedCount > 0)) return responseError(202, null, "Not deleted")
			return responseData(200, result)
		} catch (error) {
			return responseError(500, null, "Internal Server Error")
		}
	}

	async productAdd (cid, pid) {
		try {
			const exist = await cartModel.findOne({ _id: cid }).populate(`${MONGOOSE_DB_COLLECTION_PRODUCTS}.product`).lean()
			if (!exist) return responseError(404, null, "Cart not found")

			const existProduct = exist.products.find(p => JSON.stringify(p.product._id) === JSON.stringify(pid))

			if (!existProduct) {
				const newProduct = new ProductCart(pid)
				const result = await cartModel.findByIdAndUpdate(cid, { $push: { products: newProduct } }).populate(`${MONGOOSE_DB_COLLECTION_PRODUCTS}.product`).lean()
				return responseData(200, result)
			}

			existProduct.quantity = existProduct.quantity + 1
			const result = await cartModel.updateOne({ _id: cid }, exist)
			const { modifiedCount } = result
			if (!(modifiedCount > 0)) return responseError(202, null, "Not modified")
			return responseData(200, exist)
		} catch (error) {
			console.log(error)
			return responseError(500, null, "Internal Server Error")
		}
	}

	async productUpdate (cid, pid, obj) {
		try {
			const exist = await cartModel.findOne({ _id: cid }).populate(`${MONGOOSE_DB_COLLECTION_PRODUCTS}.product`).lean()
			if (!exist) return responseError(404, null, "Cart not found")
			const existProduct = exist.products.find(p => JSON.stringify(p.product._id) === JSON.stringify(pid))
			if (!existProduct) return responseError(404, null, "Product not found")

			existProduct.quantity = obj.quantity

			const result = await cartModel.updateOne({ _id: cid }, exist).populate(`${MONGOOSE_DB_COLLECTION_PRODUCTS}.product`).lean()
			const { modifiedCount } = result
			if (!(modifiedCount > 0)) return responseError(202, null, "Not modified")
			return responseData(200, existProduct)
		} catch (error) {
			console.log(error)
			return responseError(500, null, "Internal Server Error")
		}
	}

	async productRemove (cid, pid) {
		try {
			const exist = await cartModel.findOne({ _id: cid }).populate(`${MONGOOSE_DB_COLLECTION_PRODUCTS}.product`).lean()
			if (!exist) return responseError(404, null, "Cart not found")
			const existProduct = exist.products.find(p => JSON.stringify(p.product._id) === JSON.stringify(pid))
			if (!existProduct) return responseError(404, null, "Product not found")

			const position = exist.products.findIndex(p => JSON.stringify(p.product._id) === JSON.stringify(pid))
			exist.products.splice(position, 1)

			const result = await cartModel.updateOne({ _id: cid }, exist)
			const { modifiedCount } = result
			if (!(modifiedCount > 0)) return responseError(202, null, "Not deleted")
			return responseData(200, exist)
		} catch (error) {
			return responseError(500, null, "Internal Server Error")
		}
	}
}

export const cartService = new CartService()