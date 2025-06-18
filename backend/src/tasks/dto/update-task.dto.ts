import { CreateTaskSchema } from "./create-task.dto";
import { z } from "zod";

export const UpdateTaskSchema = CreateTaskSchema.partial();
export type IUpdateTaskDto = z.infer<typeof UpdateTaskSchema>;
