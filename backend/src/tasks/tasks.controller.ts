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
import { ICreateTaskDto, CreateTaskSchema } from "./dto/create-task.dto";
import { IUpdateTaskDto, UpdateTaskSchema } from "./dto/update-task.dto";

@Controller("tasks")
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Get()
	findAll() {
		return this.tasksService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.tasksService.findOne(id);
	}

	@Post()
	create(@Body() body: ICreateTaskDto) {
		try {
			const createTaskDto = CreateTaskSchema.parse(body);
			return this.tasksService.create(createTaskDto);
		} catch (e) {
			throw new BadRequestException(e.errors ?? e.message);
		}
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() body: IUpdateTaskDto) {
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
