import { createModel } from "@/utils/mongoose";
import type { InferSchemaType } from "mongoose";
import { Schema } from "mongoose";

export const taskSchema = new Schema(
	{
		/**
		 * @required The title of the task.
		 */
		title: {
			type: String,
			required: true,
		},
		/**
		 * @optional The description of the task.
		 */
		description: {
			type: String,
			required: false,
		},
		/**
		 * @required The status of the task.
		 */
		status: {
			type: String,
			required: true,
			enum: ["todo", "in-progress", "done"],
		},
	},
	{
		timestamps: true,
	},
);

export type ITask = InferSchemaType<typeof taskSchema>;

export const Task = createModel("Task", taskSchema);
