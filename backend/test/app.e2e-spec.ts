import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "@/app.module";
import { ICreateTaskDto } from "@/tasks/dto/create-task.dto";
import { IUpdateTaskDto } from "@/tasks/dto/update-task.dto";
import { faker } from "@faker-js/faker";
import { status } from "@/tasks/task.schema";

describe("AppController (e2e)", () => {
	let app: INestApplication;

	const mockedCreationData = {
		title: faker.lorem.sentence(),
		description: faker.lorem.paragraph(),
		status: faker.helpers.arrayElement(Object.values(status)),
	} satisfies ICreateTaskDto;

	const mockedModificationData = {
		status: faker.helpers.arrayElement(Object.values(status)),
	} satisfies IUpdateTaskDto;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it("GET /tasks (should return empty or list)", async () => {
		const res = await request(app.getHttpServer()).get("/tasks");
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
	});

	it("POST /tasks (should create a task)", async () => {
		const res = await request(app.getHttpServer())
			.post("/tasks")
			.send(mockedCreationData);
		expect(res.status).toBe(201);
		expect(res.body).toHaveProperty("_id");
		expect(res.body.title).toBe(mockedCreationData.title);
	});

	it("PATCH /tasks/:id (should modify a task)", async () => {
		const createRes = await request(app.getHttpServer())
			.post("/tasks")
			.send(mockedCreationData);

		const { _id } = createRes.body;

		const updateRes = await request(app.getHttpServer())
			.patch(`/tasks/${_id}`)
			.send(mockedModificationData);
		expect(updateRes.status).toBe(200);
		expect(updateRes.body).toHaveProperty("_id");
	});

	it("DELETE /tasks/:id (should delete a task)", async () => {
		const createRes = await request(app.getHttpServer())
			.post("/tasks")
			.send(mockedCreationData);

		const { _id } = createRes.body;

		const deleteRes = await request(app.getHttpServer()).delete(
			`/tasks/${_id}`,
		);
		expect(deleteRes.status).toBe(200);
		expect(deleteRes.body).toHaveProperty("_id");
	});
});
