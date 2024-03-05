import { IDatabase, MySQL } from "./mysql";

class Database {
    db: IDatabase;

    constructor() {
        const { db } = new MySQL();
        this.db = db;
    }
}

export const database = new Database().db;
