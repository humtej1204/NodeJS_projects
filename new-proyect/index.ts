import { env } from "./src/infrasctructure/config/environments/environments";
import { checkEnvVariables } from "./src/lib/check-env";
import { server } from "./src/server";
import { appConsole } from "./src/utils/app-console";
import { AppError } from "./src/utils/app-error";

process.on("uncaughtException", (error: Error) => {
    appConsole.error(error);
    if (!(error instanceof AppError)) {
        process.exit(1);
    }
});

server.listen(env.app.port, () => {
    checkEnvVariables(env)
    appConsole.log(`Server running on port ${env.app.port}`);
})