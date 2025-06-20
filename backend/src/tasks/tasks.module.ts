import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TasksController } from "./tasks.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { taskSchema } from "@/tasks/task.schema";

@Module({
	imports: [MongooseModule.forFeature([{ name: "Task", schema: taskSchema }])],
	controllers: [TasksController],
	providers: [TasksService],
})
export class TasksModule {}
