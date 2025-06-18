import { Test, TestingModule } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { getModelToken } from "@nestjs/mongoose";

describe("TasksService", () => {
	let service: TasksService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				TasksService,
				{
					provide: getModelToken("Task"),
					useValue: {
						find: jest.fn(),
						findById: jest.fn(),
						create: jest.fn(),
						findByIdAndUpdate: jest.fn(),
						findByIdAndDelete: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<TasksService>(TasksService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
