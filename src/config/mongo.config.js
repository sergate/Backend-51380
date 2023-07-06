import { connect } from "mongoose"

import { MONGOOSE_URL } from "./config.js"

export const connectMongo = async () => await connect(MONGOOSE_URL, { dbName: "ecommerce" })