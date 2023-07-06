import { responseData, responseError } from "../../utils/response.utils.js"
import { userModel } from "../schemas/user.schema.js"
import { User } from "../models/user.model.js"
import { createHash, isValidatePassword } from "../../utils/hash.utils.js"
import { cartService } from "./cart.service.js"

class UserService {
	async getAll (page, limit) {
		try {
			const result = await userModel.getAll().paginate({}, { page, limit, lean: true })
			return responseData(200, result)
		} catch (error) {
			return responseError(500, null, "Internal Server Error")
		}
	}

	async getOne (email) {
		try {
			const exist = await userModel.findOne({ email }).lean()
			if (!exist) return responseError(404, null, "User Not Found")
			return responseData(200, exist)
		} catch (error) {
			return responseError(500, null, "Internal Server Error")
		}
	}

	async validatePassword (user, password) {
		try {
			const pass = isValidatePassword(user, password)
			if (!pass) return responseError(404, null, "Invalid Password")
			return responseData(200, pass)
		} catch (error) {
			return responseError(500, null, "Internal Server Error")
		}
	}

	async create (obj) {
		try {
			if (!(
				obj.first_name &&
				obj.email &&
				obj.password
			)) return responseError(400, null, "All fields are required")
			const exist = await userModel.findOne({ email: obj.email })
			if (exist) return responseError(422, null, "User already exists")

			const cart = await cartService.create()
			const { payload } = cart
			const user = new User(obj.first_name, obj.last_name, obj.email, obj.age, createHash(obj.password), payload._id, obj.role)
			const result = await userModel.create(user)
			return responseData(201, result)
		} catch (error) {
			return responseError(500, null, "Internal Server Error")
		}
	}

	async update (email, obj) {
		try {
			if (!(
				email &&
				obj.obj
			)) return responseError(400, null, "All fields are required")
			const exist = await userModel.findOne({ email })
			if (!exist) return responseError(404, null, "User Not Found")

			exist.first_name 	= obj.first_name 	|| exist.first_name
			exist.last_name 	= obj.last_name 	|| exist.last_name
			exist.age 			= obj.age 			|| exist.age
			exist.password 		= obj.password 		|| exist.password
			exist.role 			= obj.role 			|| exist.role

			const result = await userModel.updateOne({ email }, exist)
			const { modifiedCount } = result
			if (!(modifiedCount > 0)) return responseError(202, null, "Not modified")
			return responseData(200, exist)
		} catch (error) {
			return responseError(500, null, "Internal Server Error")
		}
	}

	async delete (email) {
		try {
			const exist = await userModel.findOne({ email })
			if (!exist) return responseError(404, null, "User Not Found")

			const result = await userModel.deleteOne({ email })
			const { deletedCount } = result
			if (!(deletedCount > 0)) return responseError(202, null, "Not deleted")
			return responseData(200, result)
		} catch (error) {
			return responseError(500, null, "Internal Server Error")
		}
	}
}

export const userService = new UserService()