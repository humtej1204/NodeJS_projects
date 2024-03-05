import express, { Application } from "express";
import cors from 'cors';
import { requestEnd, requestStart } from "./utils/request.interceptor";
import { api } from "./infrasctructure/api";
import { AppContext } from "./infrasctructure/config/app-context";
import { database } from "./infrasctructure/database/database";

class Server {
    private api: Application = api(new AppContext(database));
    app: Application = express();

    constructor() {
        this.init();
    }

    init() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(cors(
            { origin: '*' }
        ));

        this.app.use(requestStart);
        this.app.use('/v1', this.api);
        this.app.use(requestEnd);
    }
}

export const server = new Server().app;
