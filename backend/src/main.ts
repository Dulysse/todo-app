import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { z } from "zod";

export const envVariablesSchema = z.object({
	/**
	 * @required your database connection URL
	 */
	MONGO_URI: z.string().startsWith("mongodb://"),
	/**
	 * @required your application port
	 */
	PORT: z
		.string()
		.trim()
		.regex(/^[0-9]{4}|[0-9]{5}$/),
});

const envVariablesOutput = envVariablesSchema.safeParse(process.env);

if (!envVariablesOutput.success) {
	const issue = envVariablesOutput.error.issues.at(0);
	if (issue)
		throw new Error(
			`Incorrect environment variable: "${issue.path.at(0)}", code: "${issue.code}", message: "${issue.message}"`,
		);
} else {
	process.env = envVariablesOutput.data;
}

declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof envVariablesSchema> {}
	}
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	await app.listen(process.env.PORT);
}
bootstrap();
