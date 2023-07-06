import { Schema, model } from "mongoose"
import paginate from "mongoose-paginate-v2"

import { MONGOOSE_DB_COLLECTION_CARTS, MONGOOSE_DB_COLLECTION_USERS } from "../../config/config.js"

const userSchema = new Schema({
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		default: null
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	age: {
		type: Number,
		default: null
	},
	password: {
		type: String,
		required: true
	},
	cart: {
		type: Schema.Types.ObjectId,
		ref: MONGOOSE_DB_COLLECTION_CARTS,
		default: null
	},
	role: {
		type: String,
		default: "usuario"
	}
})

userSchema.plugin(paginate)

export const userModel = model(MONGOOSE_DB_COLLECTION_USERS, userSchema)