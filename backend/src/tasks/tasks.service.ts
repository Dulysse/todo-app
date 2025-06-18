import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import type { ICreateTaskDto } from "./dto/create-task.dto";
import type { IUpdateTaskDto } from "./dto/update-task.dto";
import type { ITask } from "./task.schema";

@Injectable()
export class TasksService {
	constructor(@InjectModel("Task") private readonly taskModel: Model<ITask>) {}

	async findAll() {
		return this.taskModel.find().exec();
	}

	async findOne(id: string) {
		const task = await this.taskModel.findById(id).exec();
		if (!task) throw new NotFoundException(`Task with id "${id}" not found`);
		return task;
	}

	async create(createTaskDto: ICreateTaskDto) {
		const task = new this.taskModel(createTaskDto);
		return task.save();
	}

	async update(id: string, updateTaskDto: IUpdateTaskDto) {
		const task = await this.taskModel
			.findByIdAndUpdate(id, updateTaskDto, {
				new: true,
				runValidators: true,
			})
			.exec();

		if (!task) throw new NotFoundException(`Task with id "${id}" not found`);
		return task;
	}

	async remove(id: string) {
		const task = await this.taskModel.findByIdAndDelete(id).exec();
		if (!task) throw new NotFoundException(`Task with id "${id}" not found`);
		return task;
	}
}
