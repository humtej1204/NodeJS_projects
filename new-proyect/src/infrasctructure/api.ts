import express, { Application, Request, Router, Response } from "express";
import { HttpStatusInfo } from "../utils/http-status-info";
import { Repositories } from "../domain/common/interfaces/repositories.interface";
import { testController } from "./controllers/test.controller";

class API {
    testController: Router;
    api: Application

    constructor(
        private readonly repositories: Repositories
    ) {
        this.testController = testController(this.repositories)
        this.api = express();
        this.init()
    }

    init() {
        // this.api.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
        this.api.use("/test", this.testController)

        this.api.use("**", (_req: Request, res: Response) => {
            res.status(HttpStatusInfo.NOT_FOUND.code)
            .json({
                kindMessage: HttpStatusInfo.NOT_FOUND.response,
                success: false
            });
        });
    }
}

export const api = (repositories: Repositories): Application => 
    new API(repositories).api;