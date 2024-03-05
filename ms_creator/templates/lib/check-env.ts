/* eslint-disable @typescript-eslint/no-explicit-any */
import { IEnvironments } from "../infrasctructure/config/environments/environments.interface";
import { appConsole } from "../utils/app-console";

export function checkEnvVariables(env: IEnvironments) {
    const privateWords = ['pass', 'secret', 'apiKey'];

    const verifyEnvironment = (envKey: string, envValue: any): void => {
        if (envValue === undefined) throw new Error(`Variable ${envKey} is undefined`);
        if (typeof envValue === "object") {
            Object.entries(envValue).map(([key, value]) => {
                verifyEnvironment(key, value);
            })
            return;
        }

        if (privateWords.includes(envKey)) {
            appConsole.log(`ENV ${envKey.toUpperCase()} => ${envValue.slice(0, 3)}...`);
        }
        else appConsole.log(`ENV ${envKey.toUpperCase()} => ${envValue}`);
    }

    verifyEnvironment('ENV', env);
}
