import mongoose from "mongoose";

export function createModel<T extends mongoose.Schema>(
	name: string,
	schema: T,
) {
	return mongoose.model<mongoose.InferSchemaType<T>>(name, schema);
}
