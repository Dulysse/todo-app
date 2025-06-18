import { z } from "zod";

export const CreateTaskSchema = z.object({
	/**
	 * @required The title of the task
	 */
	title: z.string().min(1),
	/**
	 * @optional The description of the task
	 */
	description: z.string().optional(),
	/**
	 * @required The status of the task
	 */
	status: z.enum(["todo", "in-progress", "done"]),
});

export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;
