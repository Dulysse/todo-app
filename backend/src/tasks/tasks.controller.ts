import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	BadRequestException,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskSchema } from "./dto/create-task.dto";
import { UpdateTaskSchema } from "./dto/update-task.dto";

@Controller("tasks")
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Post()
	create(@Body() body: unknown) {
		try {
			const createTaskDto = CreateTaskSchema.parse(body);
			return this.tasksService.create(createTaskDto);
		} catch (e) {
			throw new BadRequestException(e.errors ?? e.message);
		}
	}

	@Get()
	findAll() {
		return this.tasksService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.tasksService.findOne(id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() body: unknown) {
		try {
			const updateTaskDto = UpdateTaskSchema.parse(body);
			return this.tasksService.update(id, updateTaskDto);
		} catch (e) {
			throw new BadRequestException(e.errors ?? e.message);
		}
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.tasksService.remove(id);
	}
}
